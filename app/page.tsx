import { getWeatherData } from "@/app/lib/openweather";
import SearchInput from "@/app/components/SearchInput";
import { Wind, Droplets, Thermometer, Gauge, Eye, MapPin } from "lucide-react";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const resolvedParams = await searchParams;
  const city = resolvedParams.city || "Karachi";
  const data = await getWeatherData(city);

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Weather <span className="text-sky-500">Hub</span>
          </h2>
          <p className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-widest mt-1">
            Insights for {data.name}
          </p>
        </div>
        <div className="w-full md:w-[400px]">
          <SearchInput />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Hero Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-sky-500 to-blue-700 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-sky-500/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -mr-16 -mt-16" />

          <div className="relative z-10 flex flex-col justify-between h-full min-h-[400px]">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter">
                  {data.name}{" "}
                  <span className="text-sky-200/30 text-3xl md:text-5xl">
                    {data.sys.country}
                  </span>
                </h1>
                <div className="inline-flex items-center gap-2 bg-black/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  <MapPin size={16} className="text-sky-200" />
                  <span className="text-xs md:text-sm font-bold text-sky-50">
                    {new Date().toLocaleDateString("en-GB", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="flex flex-col">
                <div className="flex items-start">
                  <span className="text-9xl md:text-[12rem] font-black tracking-tighter leading-none">
                    {Math.round(data.main.temp)}
                  </span>
                  <span className="text-4xl md:text-6xl font-black mt-4">
                    °
                  </span>
                </div>
                <p className="text-2xl md:text-4xl font-black capitalize text-sky-100/90 ml-2">
                  {data.weather[0].description}
                </p>
              </div>
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                className="w-48 h-48 md:w-64 md:h-64 drop-shadow-2xl self-center md:self-end"
                alt="weather"
              />
            </div>
          </div>
        </div>

        {/* Atmosphere Stats */}
        <div className="bg-[#161e2e]/50 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-xl flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-8 bg-sky-500 rounded-full" />
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">
              Atmosphere
            </h3>
          </div>

          <div className="space-y-8">
            <DetailRow
              icon={<Thermometer size={22} className="text-orange-400" />}
              label="Feels Like"
              value={`${Math.round(data.main.feels_like)}°`}
            />
            <DetailRow
              icon={<Wind size={22} className="text-teal-400" />}
              label="Wind Speed"
              value={`${data.wind.speed} km/h`}
            />
            <DetailRow
              icon={<Droplets size={22} className="text-blue-400" />}
              label="Humidity"
              value={`${data.main.humidity}%`}
            />
            <DetailRow
              icon={<Gauge size={22} className="text-pink-400" />}
              label="Pressure"
              value={`${data.main.pressure} hPa`}
            />
            <DetailRow
              icon={<Eye size={22} className="text-purple-400" />}
              label="Visibility"
              value={`${data.visibility / 1000} km`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between group transition-all">
      <div className="flex items-center gap-4">
        <div className="p-3.5 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-sky-500/10 group-hover:border-sky-500/20 transition-all">
          {icon}
        </div>
        <span className="text-gray-400 font-bold text-sm md:text-base">
          {label}
        </span>
      </div>
      <span className="text-xl md:text-2xl font-black text-gray-100 tracking-tight">
        {value}
      </span>
    </div>
  );
}
