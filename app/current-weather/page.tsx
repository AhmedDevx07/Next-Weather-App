import { getWeatherData } from "@/app/lib/openweather";
import {
  Cloud,
  Droplets,
  Eye,
  Gauge,
  Thermometer,
  Wind,
  MapPin,
} from "lucide-react";

export default async function CurrentWeatherPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const resolvedParams = await searchParams;
  const city = resolvedParams.city || "Karachi";
  const data = await getWeatherData(city);

  const stats = [
    {
      label: "Feels Like",
      value: `${Math.round(data.main.feels_like)}°C`,
      icon: <Thermometer size={22} className="text-orange-400" />,
      desc: "Real feel temp",
    },
    {
      label: "Humidity",
      value: `${data.main.humidity}%`,
      icon: <Droplets size={22} className="text-blue-400" />,
      desc: "Air moisture",
    },
    {
      label: "Wind Speed",
      value: `${data.wind.speed} km/h`,
      icon: <Wind size={22} className="text-teal-400" />,
      desc: "Wind velocity",
    },
    {
      label: "Visibility",
      value: `${data.visibility / 1000} km`,
      icon: <Eye size={22} className="text-purple-400" />,
      desc: "Sight range",
    },
    {
      label: "Pressure",
      value: `${data.main.pressure} hPa`,
      icon: <Gauge size={22} className="text-pink-400" />,
      desc: "Atmospheric",
    },
    {
      label: "Clouds",
      value: `${data.clouds.all}%`,
      icon: <Cloud size={22} className="text-sky-300" />,
      desc: "Cloud cover",
    },
  ];

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sky-500 font-black uppercase tracking-[0.3em] text-[10px]">
            <div className="w-8 h-[2px] bg-sky-500" />
            Live Insights
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
            Current <span className="text-sky-500">Weather</span>
          </h2>
          <p className="text-gray-500 font-bold text-sm">
            Detailed stats for {data.name}, {data.sys.country}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/10 shadow-xl shadow-black/20 group hover:border-sky-500/30 transition-all">
          <MapPin
            size={18}
            className="text-sky-400 group-hover:animate-bounce"
          />
          <span className="text-xs md:text-sm font-black tracking-widest text-gray-300">
            {data.coord.lat.toFixed(2)}°N, {data.coord.lon.toFixed(2)}°E
          </span>
        </div>
      </div>

      {/* Main Highlights Grid - Fully Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="group relative bg-[#161e2e]/40 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/5 hover:border-sky-500/30 transition-all duration-500 overflow-hidden"
          >
            {/* Subtle Gradient Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 flex items-center justify-between mb-6">
              <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-sky-500/10 group-hover:scale-110 transition-all duration-500">
                {stat.icon}
              </div>
              <span className="text-3xl font-black tracking-tighter text-white group-hover:text-sky-400 transition-colors">
                {stat.value}
              </span>
            </div>

            <div className="relative z-10">
              <p className="font-black text-sm uppercase tracking-widest text-gray-400 group-hover:text-gray-200 transition-colors">
                {stat.label}
              </p>
              <p className="text-xs text-gray-600 font-bold mt-1 uppercase tracking-tighter">
                {stat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Weather Description Card - Ultra Modern Glass */}
      <div className="relative bg-gradient-to-br from-sky-500/20 to-blue-900/40 rounded-[3rem] p-8 md:p-12 border border-white/10 overflow-hidden shadow-2xl">
        {/* Decorative Blur Orbs */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-sky-500/20 blur-[100px] rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <div className="px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
              Sky Conditions
            </div>
            <h3 className="text-5xl md:text-7xl font-black capitalize tracking-tighter text-white">
              {data.weather[0].main}
            </h3>
            <p className="text-sky-300/80 text-lg md:text-2xl font-bold italic">
              "Expect {data.weather[0].description} across the city."
            </p>

            <div className="flex gap-4 pt-4">
              <div className="flex flex-col px-6 py-3 rounded-2xl bg-black/20 backdrop-blur-md border border-white/5">
                <span className="text-[10px] font-black text-gray-500 uppercase">
                  Minimum
                </span>
                <span className="text-xl font-black">
                  {Math.round(data.main.temp_min)}°
                </span>
              </div>
              <div className="flex flex-col px-6 py-3 rounded-2xl bg-black/20 backdrop-blur-md border border-white/5">
                <span className="text-[10px] font-black text-gray-500 uppercase">
                  Maximum
                </span>
                <span className="text-xl font-black">
                  {Math.round(data.main.temp_max)}°
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-sky-400/20 blur-3xl rounded-full animate-pulse" />
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
              alt="weather icon"
              className="relative w-48 h-48 md:w-72 md:h-72 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
