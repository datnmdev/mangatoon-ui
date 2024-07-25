import { useParams } from "react-router-dom"
import UpdateStoryForm from "./components/UpdateStoryForm"
import useGetStoryById from "./hooks/useGetStoryById"
import { useEffect, useState } from "react"
import { SUCCEEDED } from "../../constants/fetchStatus.constant"
import { DELETED, FINISHED, IN_PROGRESS, SUSPENDED, UNPUBLISHED } from "../StoryManagementPage/components/StoryList/constants"
import useGetCountryById from "./hooks/useGetCountryById"
import AliasManagement from "./components/AliasManagement"

const statusOptions = [
    {
        name: 'UNPUBLISHED',
        value: UNPUBLISHED
    },
    {
        name: 'IN_PROGRESS',
        value: IN_PROGRESS
    },
    {
        name: 'SUSPENDED',
        value: SUSPENDED
    },
    {
        name: 'FINISHED',
        value: FINISHED
    },
    {
        name: 'DELETED',
        value: DELETED
    }
]

function UpdateStoryPage() {
    const { storyId } = useParams()
    const { data: storyData, status: getStoryByIdStatus, setSubmit: setGetStoryByIdSubmit } = useGetStoryById(storyId)
    const { data: countryData, status: getCountryByIdStatus, setSubmit: setGetCountryByIdSubmit } = useGetCountryById(storyData?.data?.rows?.[0]?.countryId)

    useEffect(() => {
        setGetStoryByIdSubmit(true)
    }, [])

    useEffect(() => {
        if (getStoryByIdStatus === SUCCEEDED) {
            if (storyData.data) {
                setGetCountryByIdSubmit(true)
            }
        }
    }, [getStoryByIdStatus])

    return (
        <div className="bg-white p-4 min-h-[calc(100vh+64px)] space-y-6">
            <div>
                {getStoryByIdStatus === SUCCEEDED && getCountryByIdStatus === SUCCEEDED
                    ? (
                        <UpdateStoryForm
                            storyData={{
                                id: storyData.data.rows[0].id,
                                title: storyData.data.rows[0].title,
                                description: storyData.data.rows[0].description,
                                country: {
                                    name: countryData.data[0].name,
                                    value: countryData.data[0].id
                                },
                                status: statusOptions[storyData.data.rows[0].status],
                                coverImage: storyData.data.rows[0].coverImageUrl
                            }}
                        />
                    )
                    : null}
            </div>

            <div>
                {getStoryByIdStatus === SUCCEEDED
                    && (
                        <AliasManagement
                            storyId={storyData.data.rows[0].id}
                        />
                    )}
            </div>
        </div>
    )
}

export default UpdateStoryPage