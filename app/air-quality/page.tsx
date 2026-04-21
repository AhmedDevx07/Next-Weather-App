import { getWeatherData, getAirQualityData } from "@/app/lib/openweather";
import { Wind, ShieldCheck, Zap, Activity } from "lucide-react";

export default async function AirQualityPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const resolvedParams = await searchParams;
  const city = resolvedParams.city || "Karachi";
  
  const weather = await getWeatherData(city);
  const airData = await getAirQualityData(weather.coord.lat, weather.coord.lon);
  
  const aqi = airData.list[0].main.aqi;
  const components = airData.list[0].components;

  const aqiLevels = {
    1: { label: "Excellent", color: "text-emerald-400", bg: "bg-emerald-400/5", border: "border-emerald-400/20", glow: "shadow-emerald-500/20" },
    2: { label: "Fair", color: "text-yellow-400", bg: "bg-yellow-400/5", border: "border-yellow-400/20", glow: "shadow-yellow-500/20" },
    3: { label: "Moderate", color: "text-orange-400", bg: "bg-orange-400/5", border: "border-orange-400/20", glow: "shadow-orange-500/20" },
    4: { label: "Poor", color: "text-red-400", bg: "bg-red-400/5", border: "border-red-400/20", glow: "shadow-red-500/20" },
    5: { label: "Hazardous", color: "text-purple-400", bg: "bg-purple-400/5", border: "border-purple-400/20", glow: "shadow-purple-500/20" },
  };

  const currentLevel = aqiLevels[aqi as keyof typeof aqiLevels];

  return (
    <div className="space-y-10 md:space-y-14 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sky-500 font-black uppercase tracking-[0.3em] text-[10px]">
            <Activity size={14} />
            Atmospheric Health
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter flex items-center gap-3">
            Air <span className="text-sky-500">Quality</span>
          </h2>
          <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">Pollutant concentration in {weather.name}</p>
        </div>
      </div>

      {/* Main AQI Hero Card */}
      <div className={`relative overflow-hidden p-8 md:p-12 rounded-[3rem] border ${currentLevel.border} ${currentLevel.bg} backdrop-blur-xl shadow-2xl ${currentLevel.glow}`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left space-y-4">
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-400">
              Live AQI Index
            </span>
            <h3 className={`text-6xl md:text-8xl font-black tracking-tighter ${currentLevel.color}`}>
              {currentLevel.label}
            </h3>
            <p className="text-gray-400 font-bold text-lg max-w-md italic">
              The air in {weather.name} is currently rated as {currentLevel.label.toLowerCase()}.
            </p>
          </div>

          <div className="relative flex items-center justify-center">
            {/* Visual Ring */}
            <div className={`h-48 w-48 md:h-64 md:w-64 rounded-full border-[16px] border-white/5 flex flex-col items-center justify-center relative shadow-inner`}>
              <span className={`text-6xl md:text-8xl font-black ${currentLevel.color} tracking-tighter`}>{aqi}</span>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-2">Scale 1-5</p>
              
              {/* Dynamic Glow Ring */}
              <div className={`absolute inset-[-16px] rounded-full border-[4px] ${currentLevel.border} opacity-50`} />
            </div>
          </div>
        </div>
      </div>

      {/* Pollutants Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <PollutantCard label="PM2.5" value={components.pm2_5} unit="μg/m³" desc="Fine Particles" />
        <PollutantCard label="PM10" value={components.pm10} unit="μg/m³" desc="Coarse Particles" />
        <PollutantCard label="NO₂" value={components.no2} unit="μg/m³" desc="Nitrogen Dioxide" />
        <PollutantCard label="O₃" value={components.o3} unit="μg/m³" desc="Ozone Level" />
      </div>

      {/* Pro Health Advisory */}
      <div className="bg-[#161e2e]/40 backdrop-blur-2xl p-8 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-center border border-white/5 hover:border-sky-500/20 transition-all duration-500">
        <div className="p-5 bg-sky-500/10 rounded-[1.5rem] text-sky-400 shadow-xl shadow-sky-500/10 group-hover:scale-110 transition-transform">
          <ShieldCheck size={32} />
        </div>
        <div className="space-y-2 text-center md:text-left">
          <h4 className="font-black text-2xl tracking-tight text-white flex items-center justify-center md:justify-start gap-2">
            Health <span className="text-sky-500">Advisory</span>
          </h4>
          <p className="text-gray-400 font-bold text-sm md:text-base leading-relaxed max-w-3xl">
            {aqi <= 2 
              ? "Ideal for outdoor activities. Air quality is considered satisfactory, and air pollution poses little or no risk to your health. Feel free to open your windows!" 
              : "Caution advised. Members of sensitive groups may experience minor health effects. The general public should limit prolonged outdoor exertion if they feel symptoms."}
          </p>
        </div>
      </div>
    </div>
  );
}

function PollutantCard({ label, value, unit, desc }: { label: string; value: number; unit: string; desc: string }) {
  return (
    <div className="group relative bg-[#161e2e]/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 hover:border-sky-500/40 transition-all duration-500 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10 flex justify-between items-start mb-6">
        <p className="font-black text-2xl text-white tracking-tighter group-hover:text-sky-400 transition-colors">{label}</p>
        <span className="text-[9px] bg-white/5 px-3 py-1 rounded-full border border-white/10 text-gray-500 uppercase font-black tracking-widest">{unit}</span>
      </div>
      
      <div className="relative z-10 space-y-1">
        <p className="text-4xl font-black text-white tracking-tighter">{value.toFixed(1)}</p>
        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{desc}</p>
      </div>

      {/* Modern Slim Progress Bar */}
      <div className="relative z-10 w-full h-1.5 bg-white/5 rounded-full mt-8 overflow-hidden border border-white/5">
        <div 
          className="h-full bg-gradient-to-r from-sky-600 to-sky-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(56,189,248,0.5)]" 
          style={{ width: `${Math.min((value/100)*100, 100)}%` }}
        ></div>
      </div>
    </div>
  );
}