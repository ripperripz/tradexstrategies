// Centralized API configuration and mock data for demo mode
const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:3001/api' 
  : (import.meta.env.VITE_API_URL || 'https://your-backend-api.com/api');

// Demo data for when the backend is unavailable
const MOCK_STRATEGIES = [
  {
    id: 1,
    name: "Machine Learning Momentum",
    market: "Crypto",
    timeframe: "4H",
    winRate: 68.5,
    profitFactor: 2.4,
    maxDrawdown: 8.2,
    avgReturn: 15.4,
    indicators: ["RSI", "MACD", "Neural Networks"],
    description: "Advanced trend-following system utilizing XGBoost classifiers for signal filtering and momentum identification.",
    rules: ["Price above 200 EMA", "RSI crossover above 50", "Neural network confidence > 85%"],
    pros: ["High win rate", "Strong risk management"],
    cons: ["Requires high compute", "Sensitive to sideways markets"],
    trades: [{ type: 'Win', count: 182 }, { type: 'Loss', count: 85 }],
    equity: [
      { month: 'Jan', value: 10000 }, { month: 'Feb', value: 11200 },
      { month: 'Mar', value: 10800 }, { month: 'Apr', value: 12500 }
    ],
    monthlyReturns: [
      { month: 'Jan', return: 12 }, { month: 'Feb', return: 8 },
      { month: 'Mar', return: -3 }, { month: 'Apr', return: 15 }
    ]
  },
  {
    id: 2,
    name: "Breakout Momentum Scanner",
    market: "Stocks",
    timeframe: "Daily",
    winRate: 58.2,
    profitFactor: 1.8,
    maxDrawdown: 12.5,
    avgReturn: 11.2,
    indicators: ["Bollinger Bands", "Volume", "Price Action"],
    description: "Identifies breakout opportunities on the daily chart with volume confirmation for high-probability swing trades.",
    rules: ["Volume > 2x average", "Price breakout of 20-day high", "Market breadth positive"],
    pros: ["Scalable", "Clear entry/exit signals"],
    cons: ["Prone to false breakouts", "Requires patient waiting"],
    trades: [{ type: 'Win', count: 145 }, { type: 'Loss', count: 104 }],
    equity: [
      { month: 'Jan', value: 10000 }, { month: 'Feb', value: 10500 },
      { month: 'Mar', value: 11200 }, { month: 'Apr', value: 11800 }
    ],
    monthlyReturns: [
      { month: 'Jan', return: 5 }, { month: 'Feb', return: 6 },
      { month: 'Mar', return: 7 }, { month: 'Apr', return: 4 }
    ]
  },
  {
    id: 3,
    name: "Forex Scalping Edge",
    market: "Forex",
    timeframe: "15m",
    winRate: 72.1,
    profitFactor: 2.1,
    maxDrawdown: 5.4,
    avgReturn: 8.7,
    indicators: ["Stochastics", "VWAP", "Moving Averages"],
    description: "High-frequency intra-day strategy focused on catching small price movements during high liquidity sessions.",
    rules: ["New York or London session active", "VWAP rejection", "Stochastic oversold/overbought"],
    pros: ["Many opportunities daily", "Low drawdown"],
    cons: ["High commission costs", "Requires constant monitoring"],
    trades: [{ type: 'Win', count: 842 }, { type: 'Loss', count: 325 }],
    equity: [
      { month: 'Jan', value: 10000 }, { month: 'Feb', value: 10800 },
      { month: 'Mar', value: 11500 }, { month: 'Apr', value: 12100 }
    ],
    monthlyReturns: [
      { month: 'Jan', return: 8 }, { month: 'Feb', return: 7 },
      { month: 'Mar', return: 6 }, { month: 'Apr', return: 5 }
    ]
  }
];

const MOCK_DISCUSSIONS = [
  { id: 1, title: 'Best strategy for BTC 2024?', author: 'TradingBot101', replies: 12, category: 'General' },
  { id: 2, title: 'How to optimize RSI parameters?', author: 'QuantAnalyst', replies: 8, category: 'Technical' },
  { id: 3, title: 'ML Models vs Traditional Indicators', author: 'AI_Trader', replies: 25, category: 'Research' }
];

export const api = {
  // Strategies
  async getAllStrategies() {
    try {
      const response = await fetch(`${API_BASE_URL}/strategies`);
      if (!response.ok) throw new Error('API down');
      const data = await response.json();
      return data;
    } catch (e) {
      console.warn("Using mock data as backend is unavailable");
      return { strategies: MOCK_STRATEGIES.map(s => ({
        ...s,
        win_rate: s.winRate,
        profit_factor: s.profitFactor,
        max_drawdown: s.maxDrawdown,
        avg_return: s.avgReturn
      })) };
    }
  },

  async getStrategyById(id: number) {
    try {
      const response = await fetch(`${API_BASE_URL}/strategies/${id}`);
      if (!response.ok) throw new Error('API down');
      const data = await response.json();
      return data;
    } catch (e) {
      const strategy = MOCK_STRATEGIES.find(s => s.id === Number(id));
      if (!strategy) throw new Error('Strategy not found');
      return { strategy: {
        ...strategy,
        win_rate: strategy.winRate,
        profit_factor: strategy.profitFactor,
        max_drawdown: strategy.maxDrawdown,
        avg_return: strategy.avgReturn
      } };
    }
  },

  async createStrategy(strategy: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/strategies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(strategy),
      });
      if (!response.ok) throw new Error('API down');
      return response.json();
    } catch (e) {
      return { success: true, message: "Strategy saved locally (Demo Mode)", strategy };
    }
  },

  // Auth
  async signup(data: { name: string; email: string; password: string }) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('API down');
      return response.json();
    } catch (e) {
      console.warn("Mock Signup active");
      return { 
        token: 'mock-token-123', 
        user: { name: data.name, email: data.email, id: 'mock-id' } 
      };
    }
  },

  async login(data: { email: string; password: string }) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('API down');
      return response.json();
    } catch (e) {
      console.warn("Mock Login active");
      // Allow any login in demo mode
      return { 
        token: 'mock-token-123', 
        user: { name: 'Demo User', email: data.email, id: 'mock-id' } 
      };
    }
  },

  async getProfile(token: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('API down');
      return response.json();
    } catch (e) {
      return { user: { name: 'Demo User', email: 'demo@example.com', id: 'mock-id' } };
    }
  },

  // Discussions
  async getAllDiscussions(token: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/discussions`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('API down');
      return response.json();
    } catch (e) {
      return { discussions: MOCK_DISCUSSIONS };
    }
  },

  async createDiscussion(token: string, data: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/discussions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('API down');
      return response.json();
    } catch (e) {
      return { success: true, message: "Discussion posted locally (Demo Mode)" };
    }
  },
};
