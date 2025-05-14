import React, { useState, useEffect } from 'react'
import { useCatalogFilters } from '../../../../shared/lib/context/CatalogFiltersProvider'
import GamesList from './components/GamesList/GamesList'
import SkeletonSlider from './components/skeletons/SkeletonSlider/SkeletonSlider'
import SkeletonGamesList from './components/skeletons/SkeletonGamesList/SkeletonGamesList'
import AdSlider from './components/AdSlider/AdSlider'
import type { Game, GamesListData } from './types'
import axios from 'axios'

function CatalogGamesContent() {
    const { selectedGenre, selectedSet, isLoading, changeLoadingState } =
        useCatalogFilters()

    const [gamesList, setGamesList] = useState<GamesListData[]>([])
    const [adSliderGames, setAdSliderGames] = useState<Game[]>([])

    const getAPIUrl = (): string => {
        let url = /* `https://cors-anywhere.herokuapp.com/`+ */ `https://polygames-backend.onrender.com/api/games/`

        return url
    }

    /* Запрос для AdSlider — 5 самых популярных по выбранным жанрам */
    const fetchAdSliderGames = async (url: string): Promise<void> => {
        try {
            const response = await axios.get<Game[]>(
                url /* {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
            } */
            )
            setAdSliderGames(response.data.slice(0, 4))
        } catch (error) {
            console.error('Ошибка при загрузке AdSlider игр:', error)
        }
    }

    /* Запрос для GamesList */
    const fetchGamesList = async (url: string): Promise<void> => {
        try {
            const response = await axios.get<Game[]>(url, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
            })

            const formattedData: GamesListData = {
                title: `Лучшие представители ${selectedGenre === 'all' ? 'всех жанров' : `жанра ${selectedGenre}`}${selectedSet === 'all' ? '' : `, набор ${selectedSet}`}`,
                games: response.data,
            }

            setGamesList([formattedData])
        } catch (error) {
            console.error('Ошибка при загрузке списка игр:', error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                changeLoadingState(true)
                const APIUrl = getAPIUrl()

                await fetchAdSliderGames(APIUrl)
                await fetchGamesList(APIUrl)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                changeLoadingState(false)
            }
        }

        fetchData()
    }, [selectedGenre, selectedSet])

    return (
        <>
            {!isLoading ? (
                <AdSlider games={adSliderGames} />
            ) : (
                <SkeletonSlider />
            )}
            {!isLoading ? (
                gamesList.map((list, index) => (
                    <GamesList
                        title={list.title}
                        games={list.games}
                        key={index}
                    />
                ))
            ) : (
                <SkeletonGamesList title={''} />
            )}
        </>
    )
}

export default CatalogGamesContent
