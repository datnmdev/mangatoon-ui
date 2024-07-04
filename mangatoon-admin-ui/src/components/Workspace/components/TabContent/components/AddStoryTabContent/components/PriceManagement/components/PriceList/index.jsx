import Loader from "../../../../../../../../../Loader"
import Table from "../../../../../../../../../Table"

const headers = [
    'Id',
    'Price',
    'Start Time'
]

function PriceList({
    refetch = { value: 0 }
}) {

    return (
        <Loader>
            <Table 
                headers={headers}
            />
        </Loader>
    )
}

export default PriceList