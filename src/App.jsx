
import { lazy, Suspense, useEffect, useState } from 'react'
import axios from 'axios'
import { Routes, Route, Navigate } from 'react-router'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import KPICard from './components/KPICard'

import './App.css'
const PerformanceChart = lazy(
    () => import('./components/PerformanceChart')
)
function App() {
    // 1. API data
    const [campaigns, setCampaigns] = useState([])

    // 2. Selected filters
    const [selectedCampaignId, setSelectedCampaignId] =
        useState('education')

    const [selectedRange, setSelectedRange] = useState('all')

    // 3. API request status
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // 4. Fetch campaign data
    useEffect(() => {
        let active = true

        async function fetchCampaigns() {
            try {
                const response = await axios.get('/api/campaigns.json')

                if (active) {
                    if (!Array.isArray(response.data)) {
                        throw new Error('Invalid campaign data')
                    }

                    setCampaigns(response.data)
                    setError('')
                }
            } catch (err) {
                if (active) {
                    setError('Unable to load campaign data.')
                    console.error(err)
                }
            } finally {
                if (active) {
                    setLoading(false)
                }
            }
        }

        fetchCampaigns()

        return () => {
            active = false
        }
    }, [])

    // 5. Find selected campaign
    const selectedCampaign =
        campaigns.find(
            campaign => campaign.id === selectedCampaignId
        ) ?? campaigns[0]

    // 6. Filter campaign data by selected range
    const filteredData = selectedCampaign
        ? selectedRange === '1'
            ? selectedCampaign.monthly.slice(-1)
            : selectedRange === '3'
                ? selectedCampaign.monthly.slice(-3)
                : selectedCampaign.monthly
        : []

    // 7. Calculate metrics
    const reached = filteredData.reduce(
        (total, month) => total + month.value,
        0
    )

    const target = selectedCampaign?.target ?? 0

    const achievement = target > 0
        ? ((reached / target) * 100).toFixed(1)
        : '0.0'

    const remaining = Math.max(target - reached, 0)

    return (
        <div className="app-layout">
            <Sidebar />

            <main className="dashboard">
                <Header />

                <Routes>
                    {/* Default page */}
                    <Route
                        path="/"
                        element={<Navigate to="/performance" replace />}
                    />



                    {/* Overview page */}
                    <Route
                        path="/overview"
                        element={
                            <section id="overview">
                                <h2>Campaign Overview</h2>
                                <p>Summary of all existing campaigns</p>

                                {loading && <p>Loading campaign data...</p>}

                                {!loading && error && (
                                    <p role="alert">{error}</p>
                                )}

                                {!loading && !error && campaigns.length === 0 && (
                                    <p>No campaigns available.</p>
                                )}

                                {!loading && !error && campaigns.length > 0 && (
                                    <>
                                        <div className="kpi-grid">
                                            <KPICard
                                                title="Total Campaigns"
                                                value={campaigns.length}
                                            />
                                            <KPICard
                                                title="Overall Target"
                                                value={campaigns
                                                    .reduce((sum, c) => sum + c.target, 0)
                                                    .toLocaleString()}
                                            />
                                            <KPICard
                                                title="Total Reach"
                                                value={campaigns
                                                    .reduce(
                                                        (sum, c) =>
                                                            sum + c.monthly.reduce(
                                                                (total, month) => total + month.value,
                                                                0
                                                            ),
                                                        0
                                                    )
                                                    .toLocaleString()}
                                            />
                                            <KPICard
                                                title="Overall Achievement"
                                                value={`${(
                                                    campaigns.reduce(
                                                        (sum, c) =>
                                                            sum + c.monthly.reduce(
                                                                (total, month) => total + month.value,
                                                                0
                                                            ),
                                                        0
                                                    ) /
                                                    campaigns.reduce((sum, c) => sum + c.target, 0) *
                                                    100
                                                ).toFixed(1)}%`}
                                            />
                                        </div>

                                        <div className="chart-card">
                                            <h3>Campaign-wise Progress</h3>

                                            {campaigns.map(campaign => {
                                                const reached = campaign.monthly.reduce(
                                                    (sum, month) => sum + month.value,
                                                    0
                                                )

                                                const percentage = campaign.target > 0
                                                    ? (reached / campaign.target) * 100
                                                    : 0

                                                return (
                                                    <div className="overview-progress" key={campaign.id}>
                                                        <div className="overview-progress-label">
                                                            <strong>{campaign.name}</strong>
                                                            <span>{percentage.toFixed(1)}%</span>
                                                        </div>

                                                        <div className="overview-progress-track">
                                                            <div
                                                                className="overview-progress-fill"
                                                                style={{
                                                                    width: `${Math.min(percentage, 100)}%`
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </>
                                )}
                            </section>
                        }
                    />


                    {/* Performance page */}
                    <Route
                        path="/performance"
                        element={
                            <section id="performance">
                                <h2>Campaign Performance</h2>

                                {loading && (
                                    <p>Loading campaign data...</p>
                                )}

                                {!loading && error && (
                                    <p role="alert">{error}</p>
                                )}

                                {!loading && !error && !selectedCampaign && (
                                    <p>No campaigns available.</p>
                                )}

                                {!loading && !error && selectedCampaign && (
                                    <>
                                        {/* Campaign and date filters */}
                                        <div className="filter-bar">
                                            <label htmlFor="campaign-select">
                                                Select Campaign
                                            </label>

                                            <select
                                                id="campaign-select"
                                                value={selectedCampaign.id}
                                                onChange={event =>
                                                    setSelectedCampaignId(event.target.value)
                                                }
                                            >
                                                {campaigns.map(campaign => (
                                                    <option
                                                        key={campaign.id}
                                                        value={campaign.id}
                                                    >
                                                        {campaign.name}
                                                    </option>
                                                ))}
                                            </select>

                                            <label htmlFor="range-select">
                                                Date Range
                                            </label>

                                            <select
                                                id="range-select"
                                                value={selectedRange}
                                                onChange={event =>
                                                    setSelectedRange(event.target.value)
                                                }
                                            >
                                                <option value="all">All Months</option>
                                                <option value="3">Last 3 Months</option>
                                                <option value="1">Last 1 Month</option>
                                            </select>
                                        </div>

                                        {/* KPI cards */}
                                        <div className="kpi-grid">
                                            <KPICard
                                                title="Campaign Target (Overall)"
                                                value={target.toLocaleString()}
                                            />

                                            <KPICard
                                                title={`${selectedCampaign.unit} (Selected Period)`}
                                                value={reached.toLocaleString()}
                                            />

                                            <KPICard
                                                title="Period Reach vs Overall Target"
                                                value={`${achievement}%`}
                                            />

                                            <KPICard
                                                title="Overall Target Minus Period Reach"
                                                value={remaining.toLocaleString()}
                                            />
                                        </div>

                                        {/* Bar chart and line chart */}
                                        <Suspense fallback={<p>Loading charts...</p>}>
                                            <PerformanceChart
                                                data={filteredData}
                                                campaignName={selectedCampaign.name}
                                                unit={selectedCampaign.unit}
                                            />
                                        </Suspense>
                                    </>
                                )}
                            </section>
                        }
                    />

                    {/* Unknown URLs */}
                    <Route
                        path="*"
                        element={<p>Page not found.</p>}
                    />
                </Routes>
            </main>
        </div>
    )
}

export default App
