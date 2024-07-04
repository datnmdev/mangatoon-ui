function FollowPage() {
    return (
        <div className="my-8">
            <div className="container mx-auto">
                <Topic
                    name={(
                        <div className="flex justify-between items-center">
                            <div className="space-x-2">
                                <span>
                                    <i className="fa-regular fa-rectangle-list"></i>
                                </span>
                                <span>Lịch sử đọc truyện</span>
                            </div>

                            <div>
                                <Button
                                    backgroundColor="red"
                                    sx={{
                                        fontSize: '1rem'
                                    }}
                                    disabled={deleteAllHistoryDetailStatus === PENDING}
                                    onClick={() => setDeleteAllHistoryDetailSubmit(true)}
                                >
                                    {deleteAllHistoryDetailStatus === PENDING ? 'Đang xoá...' : 'Xoá tất cả'}
                                </Button>
                            </div>
                        </div>
                    )}
                >
                    <HistoryList
                        refetch={refetch}
                        setRefetch={setRefetch}
                    />
                </Topic>
            </div>
        </div>
    )
}

export default FollowPage