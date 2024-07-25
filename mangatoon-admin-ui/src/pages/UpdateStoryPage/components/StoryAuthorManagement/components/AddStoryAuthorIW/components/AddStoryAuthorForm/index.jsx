import AuthorList from "./components/AuthorList"

function AddStoryAuthorForm({
    storyId,
    setRefetchStoryAuthorList
}) {
    return (
        <div>
            <div>
                <AuthorList
                    storyId={storyId}
                    setRefetchStoryAuthorList={setRefetchStoryAuthorList}
                />
            </div>
        </div>
    )
}

export default AddStoryAuthorForm