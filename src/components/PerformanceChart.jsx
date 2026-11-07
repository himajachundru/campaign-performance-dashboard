
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'

function PerformanceChart({ data, campaignName, unit }) {
    return (
        <>
            <div className="chart-card">
                <h3>{campaignName} — Monthly Performance</h3>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                            dataKey="value"
                            fill="#159b83"
                            radius={[6, 6, 0, 0]}
                            name={unit}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-card">
                <h3>{campaignName} — Performance Trend</h3>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#4b88bf"
                            strokeWidth={3}
                            name={unit}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default PerformanceChart
