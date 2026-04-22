import { getForecastData } from "@/app/lib/openweather";
import { Thermometer, Droplets, Wind, Zap } from "lucide-react";

export default async function HourlyForecast({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const resolvedParams = await searchParams;
  const city = resolvedParams.city || "Karachi";
  const data = await getForecastData(city);

  const hourlyData = data.list.slice(0, 8);

  return (
    <div className="space-y-10 md:space-y-14 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sky-500 font-black uppercase tracking-[0.3em] text-[10px]">
            <Zap size={14} className="fill-sky-500" />
            Live Timeline
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter flex items-center gap-3">
            Hourly <span className="text-sky-500">Forecast</span>
          </h2>
          <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">
            24-Hour projection for {data.city.name}
          </p>
        </div>
      </div>

      {/* Modern Horizontal Scroll / Grid for Hourly Cards */}
      <div className="relative group">
        {/* Mobile Swipe Indicator (Only visible on small screens) */}
        <div className="md:hidden text-[10px] font-black text-gray-600 uppercase tracking-widest mb-3 animate-pulse">
          ← Swipe to explore →
        </div>

        <div className="flex md:grid md:grid-cols-4 lg:grid-cols-8 gap-4 overflow-x-auto pb-6 md:pb-0 custom-scrollbar snap-x">
          {hourlyData.map((hour: any, index: number) => {
            const time = new Date(hour.dt * 1000).toLocaleTimeString("en-US", {
              hour: "numeric",
              hour12: true,
            });

            return (
              <div
                key={index}
                className="snap-center min-w-[140px] md:min-w-0 bg-[#161e2e]/40 backdrop-blur-xl p-6 flex flex-col items-center text-center border border-white/5 rounded-[2rem] hover:border-sky-500/40 hover:bg-sky-500/5 transition-all duration-500 group"
              >
                <p className="text-[10px] font-black text-gray-500 uppercase mb-4 group-hover:text-sky-400 transition-colors">
                  {time}
                </p>

                <div className="relative">
                  <div className="absolute inset-0 bg-sky-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                    alt="icon"
                    className="relative w-16 h-16 drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <p className="text-3xl font-black mt-3 tracking-tighter">
                  {Math.round(hour.main.temp)}°
                </p>
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-tighter mt-1 truncate w-full">
                  {hour.weather[0].description}
                </p>

                <div className="mt-5 pt-4 border-t border-white/5 w-full">
                  <div className="flex items-center justify-center gap-1.5">
                    <Droplets size={12} className="text-sky-400" />
                    <span className="text-[11px] font-black text-gray-300">
                      {hour.main.humidity}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Timeline Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-8 bg-sky-500 rounded-full" />
          <h3 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-3">
            Detailed <span className="text-gray-500">Timeline</span>
          </h3>
        </div>

        <div className="bg-[#161e2e]/30 backdrop-blur-md rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
          {hourlyData.map((hour: any, index: number) => {
            const fullDate = new Date(hour.dt * 1000).toLocaleString("en-US", {
              weekday: "short",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            });

            return (
              <div
                key={index}
                className={`flex items-center justify-between p-6 md:p-8 ${
                  index !== hourlyData.length - 1
                    ? "border-b border-white/5"
                    : ""
                } hover:bg-white/5 transition-all group`}
              >
                {/* Left Side: Time and Icon */}
                <div className="flex items-center gap-4 md:gap-10">
                  <span className="text-xs md:text-sm font-black text-gray-500 uppercase tracking-widest min-w-[80px] md:min-w-[120px]">
                    {fullDate}
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/5 rounded-xl group-hover:bg-sky-500/10 transition-colors">
                      <img
                        src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                        className="w-10 h-10 group-hover:scale-110 transition-transform"
                        alt="icon"
                      />
                    </div>
                    <span className="font-black text-xl md:text-3xl tracking-tighter">
                      {Math.round(hour.main.temp)}
                      <span className="text-sky-500">°C</span>
                    </span>
                  </div>
                </div>

                {/* Middle Stats: Hidden on very small screens */}
                <div className="hidden lg:flex items-center gap-12">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <Wind size={16} className="text-teal-400" />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        Wind
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-200">
                      {Math.round(hour.wind.speed)} km/h
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <Thermometer size={16} className="text-orange-400" />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        Feels
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-200">
                      {Math.round(hour.main.feels_like)}°
                    </span>
                  </div>
                </div>

                {/* Right Side: Status Tag */}
                <div className="flex items-center">
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-sky-400 bg-sky-500/10 px-4 py-2 rounded-xl border border-sky-500/20 shadow-lg shadow-sky-500/5">
                    {hour.weather[0].main}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
