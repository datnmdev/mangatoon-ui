import GenreList from "./components/GenreList"

function AddStoryGenreForm({
    storyId,
    setRefetchStoryGenreList
}) {
    return (
        <div>
            <div>
                <GenreList 
                    storyId={storyId}
                    setRefetchStoryGenreList={setRefetchStoryGenreList}
                />
            </div>
        </div>
    )
}

export default AddStoryGenreForm