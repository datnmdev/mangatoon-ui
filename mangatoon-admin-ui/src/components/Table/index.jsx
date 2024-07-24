import { Pagination } from "@mui/material"

function Table({
    headers = [],
    data = [],
    page = 1,
    count = 0,
    onPaginationChanged
}) {
    return (
        <div>
            <table className="w-full">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-4 py-2"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, index) => {
                        return (
                            <tr key={index}>
                                {row.map((value, index) => {
                                    return (
                                        <td
                                            key={index}
                                            className="text-center px-4 py-2"
                                        >
                                            {value}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div className="flex justify-center mt-8">
                {count > 0
                    ? (
                        <Pagination
                            size="large"
                            count={count}
                            page={page}
                            onChange={onPaginationChanged}
                        />
                    )
                    : null}

            </div>
        </div>
    )
}

export default Table