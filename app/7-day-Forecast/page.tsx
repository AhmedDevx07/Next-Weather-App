import { getForecastData } from "@/app/lib/openweather";
import { Calendar, Droplets, Wind, ChevronRight, Zap } from "lucide-react";

export default async function ForecastPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const resolvedParams = await searchParams;
  const city = resolvedParams.city || "Karachi";
  const data = await getForecastData(city);

  const dailyForecast = data.list.filter((reading: any) =>
    reading.dt_txt.includes("12:00:00"),
  );

  return (
    <div className="space-y-10 md:space-y-14 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sky-500 font-black uppercase tracking-[0.3em] text-[10px]">
            <Zap size={14} className="fill-sky-500" />
            Extended Forecast
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter flex items-center gap-3">
            5-Day <span className="text-sky-500">Outlook</span>
          </h2>
          <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">
            Daily climate trends for {data.city.name}
          </p>
        </div>

        <div className="hidden md:flex px-6 py-3 bg-[#161e2e]/40 backdrop-blur-xl rounded-2xl border border-white/5 items-center gap-3">
          <Calendar size={18} className="text-sky-400" />
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
            Next 5 Days
          </span>
        </div>
      </div>

      {/* Main Forecast List */}
      <div className="grid grid-cols-1 gap-6">
        {dailyForecast.map((day: any, index: number) => {
          const date = new Date(day.dt * 1000).toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "short",
          });

          return (
            <div
              key={index}
              className="group relative bg-[#161e2e]/40 backdrop-blur-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between hover:bg-[#1e293b]/60 transition-all duration-500 border border-white/5 hover:border-sky-500/30 rounded-[2.5rem] overflow-hidden"
            >
              {/* Subtle Animated Background Glow */}
              <div className="absolute -right-20 -top-20 w-48 h-48 bg-sky-500/5 blur-[80px] rounded-full group-hover:bg-sky-500/10 transition-colors" />

              {/* Date & Icon Section */}
              <div className="flex items-center gap-8 min-w-[280px] z-10 w-full md:w-auto justify-between md:justify-start">
                <div className="space-y-1">
                  <p className="font-black text-xl md:text-2xl tracking-tighter">
                    {date}
                  </p>
                  <p className="text-[10px] font-black text-sky-500 uppercase tracking-[0.2em]">
                    Scheduled Update
                  </p>
                </div>
                <div className="relative group-hover:scale-110 transition-transform duration-500">
                  <img
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt="icon"
                    className="w-20 h-20 drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Stats Section */}
              <div className="flex items-center justify-between md:justify-end gap-6 md:gap-16 w-full md:w-auto mt-6 md:mt-0 z-10">
                {/* Temp */}
                <div className="text-center md:text-right">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">
                    Temp
                  </p>
                  <p className="text-3xl md:text-4xl font-black text-white group-hover:text-sky-400 transition-colors">
                    {Math.round(day.main.temp)}
                    <span className="text-sky-500/50 text-xl font-bold">°</span>
                  </p>
                </div>

                {/* Condition */}
                <div className="hidden sm:block text-center md:text-left border-x border-white/5 px-10">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
                    Condition
                  </p>
                  <p className="font-bold capitalize text-gray-300 tracking-tight">
                    {day.weather[0].description}
                  </p>
                </div>

                {/* Humidity & Wind */}
                <div className="hidden lg:flex items-center gap-10">
                  <div className="flex flex-col items-center gap-1">
                    <Droplets size={18} className="text-blue-400 mb-1" />
                    <span className="text-sm font-black tracking-tighter">
                      {day.main.humidity}%
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Wind size={18} className="text-teal-400 mb-1" />
                    <span className="text-sm font-black tracking-tighter">
                      {Math.round(day.wind.speed)}{" "}
                      <span className="text-[10px] text-gray-500">km/h</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button className="hidden md:flex ml-10 h-14 w-14 items-center justify-center bg-white/5 group-hover:bg-sky-500 group-hover:shadow-lg group-hover:shadow-sky-500/30 rounded-2xl transition-all border border-white/5 group-hover:border-transparent active:scale-90">
                <ChevronRight
                  size={24}
                  className="text-gray-400 group-hover:text-white"
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
