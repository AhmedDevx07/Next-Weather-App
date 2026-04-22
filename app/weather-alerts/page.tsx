import { getWeatherData } from "@/app/lib/openweather";
import {
  AlertTriangle,
  Wind,
  CloudRain,
  ShieldCheck,
  Zap,
  BellRing,
} from "lucide-react";

export default async function WeatherAlertsPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const resolvedParams = await searchParams;
  const city = resolvedParams.city || "Karachi";
  const data = await getWeatherData(city);

  let alertText =
    "No immediate severe weather threats detected. It's a great day to be outside!";
  let alertIcon = <ShieldCheck size={38} />;
  let alertColor =
    "border-emerald-500/20 bg-emerald-500/5 text-emerald-400 shadow-emerald-500/5";
  let alertTitle = "System Status: Clear";
  let statusTag = "Safe";

  if (data.main.temp >= 40) {
    alertText =
      "Extreme heat warning in effect. High risk of heatstroke. Stay in shaded areas and increase water intake.";
    alertIcon = <AlertTriangle size={38} />;
    alertColor =
      "border-red-500/30 bg-red-500/10 text-red-500 shadow-red-500/10";
    alertTitle = "Critical Heat Warning";
    statusTag = "Danger";
  } else if (data.wind.speed >= 15) {
    alertText =
      "Strong wind advisory. High-velocity gusts detected. Avoid parking under trees or loose structures.";
    alertIcon = <Wind size={38} />;
    alertColor =
      "border-yellow-500/30 bg-yellow-500/10 text-yellow-400 shadow-yellow-500/10";
    alertTitle = "Wind Velocity Advisory";
    statusTag = "Caution";
  } else if (data.weather[0].main.toLowerCase().includes("rain")) {
    alertText =
      "Precipitation detected. Expect wet surfaces and reduced visibility. Drive carefully.";
    alertIcon = <CloudRain size={38} />;
    alertColor =
      "border-sky-500/30 bg-sky-500/10 text-sky-400 shadow-sky-500/10";
    alertTitle = "Active Rain Forecast";
    statusTag = "Notice";
  }

  return (
    <div className="space-y-10 md:space-y-14 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sky-500 font-black uppercase tracking-[0.3em] text-[10px]">
            <BellRing size={14} className="animate-pulse" />
            Security Monitor
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter flex items-center gap-3">
            Weather <span className="text-sky-500">Alerts</span>
          </h2>
          <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">
            Protocol status for {data.name}
          </p>
        </div>
      </div>

      {/* Hero Alert Card - Pulse Effect for Danger */}
      <div
        className={`relative overflow-hidden p-8 md:p-12 rounded-[3rem] border backdrop-blur-2xl transition-all duration-700 shadow-2xl ${alertColor}`}
      >
        {/* Animated Background Pulse */}
        <div className="absolute inset-0 bg-gradient-to-br from-current to-transparent opacity-[0.03]" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="p-6 bg-white/5 rounded-3xl backdrop-blur-md border border-white/10 shadow-xl group-hover:scale-110 transition-transform">
            {alertIcon}
          </div>

          <div className="text-center md:text-left flex-1 space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-widest border border-white/10">
                Level: {statusTag}
              </span>
              <h3 className="text-3xl md:text-4xl font-black tracking-tighter">
                {alertTitle}
              </h3>
            </div>
            <p className="text-lg md:text-xl font-bold opacity-80 leading-relaxed max-w-2xl italic">
              "{alertText}"
            </p>
          </div>

          <div className="flex flex-col items-center justify-center px-8 py-6 bg-black/20 rounded-[2rem] border border-white/5 min-w-[140px]">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">
              Ambient
            </span>
            <span className="text-4xl font-black tracking-tighter">
              {Math.round(data.main.temp)}°C
            </span>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Logic Thresholds - Bento Style */}
        <div className="bg-[#161e2e]/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-sky-500/10 rounded-lg">
                <Zap size={20} className="text-sky-400" />
              </div>
              <h4 className="font-black text-xl tracking-tight">
                Logic Thresholds
              </h4>
            </div>

            <div className="space-y-4">
              <ThresholdRow
                label="Extreme Heat"
                value="≥ 40°C"
                color="text-red-500"
              />
              <ThresholdRow
                label="High Wind"
                value="≥ 15 km/h"
                color="text-yellow-400"
              />
              <ThresholdRow
                label="Precipitation"
                value='Type "Rain"'
                color="text-sky-400"
              />
            </div>
          </div>
        </div>

        {/* Security Summary */}
        <div className="bg-gradient-to-br from-sky-500/10 to-blue-600/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 flex flex-col justify-center">
          <div className="space-y-4">
            <h4 className="font-black text-2xl tracking-tighter">
              Safe & Secure
            </h4>
            <p className="text-gray-400 font-bold text-sm md:text-base leading-relaxed">
              Our monitoring core continuously parses real-time telemetry from
              OpenWeather clusters. Each data point for{" "}
              <span className="text-white">{data.name}</span> is
              cross-referenced against localized safety standards to ensure your
              digital dashboard remains your primary source of truth.
            </p>
            <div className="pt-4 flex items-center gap-3 text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em]">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              Live Monitoring Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThresholdRow({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-white/10 transition-all">
      <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
        {label}
      </span>
      <span className={`font-black text-lg ${color} tracking-tighter`}>
        {value}
      </span>
    </div>
  );
}
