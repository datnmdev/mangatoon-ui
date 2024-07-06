import Chart from "./components/Chart"
import TopFollow from "./components/TopFollow"
import TopRating from "./components/TopRating"

function RankingPage() {
    return (
        <div className="my-8">
            <div className="container mx-auto bg-white p-4 rounded-[6px] overflow-hidden space-y-8">
                <div>
                    <Chart />
                </div>

                <div>
                    <TopFollow />
                </div>

                <div>
                    <TopRating />
                </div>
            </div>
        </div>
    )
}

export default RankingPage