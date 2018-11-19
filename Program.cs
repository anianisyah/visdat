using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VizDat
{
    class Program
    {
        static void Main(string[] args)
        {
            string[] filePaths = Directory.GetFiles(@"D:\S2 ITB\Sem3\IF5170 Visualisasi Data\Tubes\praproses\jkt\new");
            //double ffMean = 0.0;
            //double slMean = 0.0;
            double jfMean = 0.0;
            //Dictionary<DateTime, double> dictSpeedFF = new Dictionary<DateTime, double>();
            //Dictionary<DateTime, double> dictSpeedSL = new Dictionary<DateTime, double>();
            Dictionary<DateTime, double> dictJamFactor = new Dictionary<DateTime, double>();
            Dictionary<DateTime, double> dictJamFactorByDay = new Dictionary<DateTime, double>();
            //Dictionary<DateTime, double> dictCongestionBySpeed = new Dictionary<DateTime, double>();


            if (filePaths != null && filePaths.Count() > 0)
            {
                foreach (var item in filePaths)
                {
                    using (StreamReader r = new StreamReader(item))
                    {

                        string json = r.ReadToEnd();
                        List<RawTraffic> items = JsonConvert.DeserializeObject<List<RawTraffic>>(json);
                        if(items != null && items.Count > 0)
                        {
                            //ffMean = 0.0;
                            //slMean = 0.0;
                            jfMean = 0.0;

                            DateTime timestamp = DateTimeOffset.Parse(items[0].TIMESTAMP).UtcDateTime.AddHours(7);
                            string strTimestampUtc = timestamp.AddHours(-7).ToUniversalTime().ToString("yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fff'Z'").Substring(0,13);
                            //ffMean = items.Average(x => x.FF);
                            //slMean = items.Average(x => x.SL);
                            jfMean = items.Average(x => x.JF);

                            //if (dictSpeedFF.ContainsKey(timestamp.Date + new TimeSpan(timestamp.Hour,0,0)))
                            //{
                            //    double existingFF = dictSpeedFF[timestamp.Date + new TimeSpan(timestamp.Hour,0,0)];
                            //    dictSpeedFF[timestamp.Date + new TimeSpan(timestamp.Hour,0,0)] = (double)(existingFF + ffMean)/(double)2;
                            //}
                            //else
                            //{
                            //    dictSpeedFF.Add(timestamp.Date + new TimeSpan(timestamp.Hour,0,0), slMean);
                            //}

                            //if (dictSpeedSL.ContainsKey(timestamp.Date + new TimeSpan(timestamp.Hour, 0, 0)))
                            //{
                            //    double existingSL = dictSpeedSL[timestamp.Date + new TimeSpan(timestamp.Hour, 0, 0)];
                            //    dictSpeedSL[timestamp.Date + new TimeSpan(timestamp.Hour, 0, 0)] = (double)(existingSL + slMean) / (double)2;
                            //}
                            //else
                            //{
                            //    dictSpeedSL.Add(timestamp.Date + new TimeSpan(timestamp.Hour, 0, 0), slMean);
                            //}

                            if (dictJamFactor.ContainsKey(timestamp.Date + new TimeSpan(timestamp.Hour, 0, 0)))
                            {
                                double existingJF = dictJamFactor[timestamp.Date + new TimeSpan(timestamp.Hour, 0, 0)];
                                dictJamFactor[timestamp.Date + new TimeSpan(timestamp.Hour, 0, 0)] = (double)(existingJF + jfMean) / (double)2;
                            }
                            else
                            {
                                dictJamFactor.Add(timestamp.Date + new TimeSpan(timestamp.Hour, 0, 0), jfMean);
                            }
                        }
                    }
                }
            }

            var groupByDate = dictJamFactor.Keys.GroupBy(x => x.Date).ToList();
            foreach (var item in groupByDate)
            {
                double sum = 0.0;
                var listKey = dictJamFactor.Keys.Where(x => x.Date == item.Key).ToList();
                if(listKey != null && listKey.Count > 0)
                {
                    foreach (var date in listKey)
                    {
                        sum += dictJamFactor[date];
                    }
                }

                dictJamFactorByDay.Add(item.Key, sum / (double)listKey.Count);
            }
            List<CongestionPerHourByDate> listByHour = new List<CongestionPerHourByDate>();
            CongestionPerHourByDate byHour = null;
            foreach (var item in dictJamFactor)
            {
                byHour = new CongestionPerHourByDate
                {
                    date = string.Format("{0:yyyy-MM-dd}", item.Key.Date),
                    day = item.Key.DayOfWeek.ToString(),
                    hour = item.Key.Hour,
                    congestion = item.Value
                };
                listByHour.Add(byHour);
            }

            List<CongestionByDate> listByDate = new List<CongestionByDate>();
            CongestionByDate byDate = null;
            foreach (var item in dictJamFactorByDay)
            {
                byDate = new CongestionByDate
                {
                    date = string.Format("{0:yyyy-MM-dd}", item.Key.Date),
                    day = item.Key.DayOfWeek.ToString(),
                    congestion = item.Value,
                    congestion_by_hour = new List<double>()
                };
                var listKey = dictJamFactor.Keys.Where(x => x.Date == item.Key.Date).ToList();
                if (listKey != null && listKey.Count > 0)
                {
                    int i = 0;
                    foreach (var date in listKey)
                    {
                        byDate.congestion_by_hour.Add(Math.Round(dictJamFactor.ContainsKey(date + new TimeSpan(i++, 0, 0)) ? dictJamFactor[date + new TimeSpan(i++, 0, 0)]*10 : 0.0, 2));
                    }
                }
                listByDate.Add(byDate);
            }
            //foreach (var item in dictSpeedFF)
            //{
            //    dictCongestionBySpeed.Add(item.Key, (double)(item.Value - dictSpeedSL[item.Key]) / (double)item.Value * 100);
            //}

            listByHour.ForEach(i => i.congestion *= 10.0);
            listByHour.ForEach(i => i.congestion = Math.Round(i.congestion, 2));
            string jsonByHour = JsonConvert.SerializeObject(listByHour);
            File.WriteAllText(@"D:\S2 ITB\Sem3\IF5170 Visualisasi Data\Tubes\recap_congestion_by_hour.json", jsonByHour);

            listByDate.ForEach(i => i.congestion *= 10.0);
            listByDate.ForEach(i => i.congestion = Math.Round(i.congestion, 2));
            string jsonByDate = JsonConvert.SerializeObject(listByDate);
            File.WriteAllText(@"D:\S2 ITB\Sem3\IF5170 Visualisasi Data\Tubes\recap_congestion_by_date.json", jsonByDate);
            Console.ReadKey();
        }
    }

    class RawTraffic
    {
        public string ID { get; set; }
        public double FC { get; set; }
        public double FF { get; set; }
        public double JF { get; set; }
        public double LE { get; set; }
        public string SHP { get; set; }
        public double SL { get; set; }
        public string ST { get; set; }
        public string TIMESTAMP { get; set; }
    }

    class CongestionByDate
    {
        public string date { get; set; }
        public string day { get; set; }
        public double congestion { get; set; }
        public List<double> congestion_by_hour { get; set; }
    }

    class CongestionPerHourByDate
    {
        public string date { get; set; }
        public string day { get; set; }
        public int hour { get; set; }
        public double congestion { get; set; }
    }
}
