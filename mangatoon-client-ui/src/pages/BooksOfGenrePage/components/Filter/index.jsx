import { useEffect, useState } from "react"
import Select from "../../../../components/Select"
import api from "../../../../api"
import BorderedButton from "../../../../components/BorderedButton"
import SelectSearch from "../../../../components/SelectSearch"

function Filter({
    value,
    onChange
}) {
    const [genres, setGenres] = useState(null)
    const [countries, setCountries] = useState(null)
    const [data, setData] = useState(value)

    useEffect(() => {
        async function getGenres() {
            try {
                const genres = (await api.genre.getGenres()).data.data
                setGenres(genres)
            } catch (error) {

            }
        }

        async function getCountries() {
            try {
                const countries = (await api.country.getCountries()).data.data
                setCountries(countries)
            } catch (error) {

            }
        }

        getGenres()
        getCountries()
    }, [])

    useEffect(() => {
        if (onChange) {
            onChange(data)
        }
    }, [data])

    return (
        <div className="bg-white p-6 rounded-[6px] space-y-2">
            <div className="flex items-center">
                <div className="w-[148px]">
                    Thể loại truyện
                </div>

                <div>
                    {genres
                        ? (
                            <Select
                                options={genres.map(genre => ({
                                    value: genre.id,
                                    name: genre.name
                                }))}
                                value={data.genre.value}
                                onChange={e => setData({
                                    ...data,
                                    genre: {
                                        value: Number(e.target.value)
                                    }
                                })}
                            />
                        )
                        : null}
                </div>
            </div>

            <div className="flex items-center">
                <div className="w-[148px]">
                    Tình trạng
                </div>

                <div className="md:grid md:grid-cols-3 sm:grid-cols-1 gap-2 sm:space-y-2 md:space-y-0">
                    <BorderedButton
                        active={data.status === 1}
                        onClick={() => setData({
                            ...data,
                            status: 1
                        })}
                    >
                        Đang tiến hành
                    </BorderedButton>

                    <BorderedButton
                        active={data.status === 2}
                        onClick={() => setData({
                            ...data,
                            status: 2
                        })}

                    >
                        Đang tạm hoãn
                    </BorderedButton>

                    <BorderedButton
                        active={data.status === 3}
                        onClick={() => setData({
                            ...data,
                            status: 3
                        })}
                    >
                        Đã hoàn thành
                    </BorderedButton>
                </div>
            </div>

            <div className="flex items-center">
                <div className="w-[148px]">
                    Quốc gia
                </div>

                <div>
                    {countries
                        ? (
                            <SelectSearch
                                options={countries.map(country => ({
                                    value: country.id,
                                    name: country.name
                                }))}
                                value={data.country}
                                onChange={value => setData({
                                    ...data,
                                    country: value
                                })}
                            />
                        )
                        : null}
                </div>
            </div>
        </div>
    )
}

export default Filter