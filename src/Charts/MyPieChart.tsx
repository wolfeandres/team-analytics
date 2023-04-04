import { Tooltip, Pie, PieChart, Cell, Legend } from 'recharts';

const COLORS: string[] = ['#2196f3', '#000000', '#4caf50', '#808080', '#FF0000', '#A020F0', '#FFFF00'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

type ChartProps = {
    data: any[];
    dkOne: string;
}




const MyPieChart = ( props: ChartProps ) => {
  const { data, dkOne } = props;
  interface Event {
    event_type: string;
    current_page?: string;
    timestamp: number;
    setting_name?: string;
    previous_value?: string;
    current_value?: string;
    partner_device_id?: string;
    partner_serial_number?: string;
    device_name?: string;
    // add more properties here if needed
  }
  
  interface EventSubset {
    event_type: string;
    current_page?: string;
    timestamp: number;
  }

  interface finalData {
    name?: string;
    value: number;
  }

  function filterEventsWithType3(events: Event[]): EventSubset[] {
    const result: EventSubset[] = [];
    
    // sort events by timestamp in ascending order
    events.sort((a, b) => a.timestamp - b.timestamp);

    // add the first event to the result array
    const firstEvent = events[0];
    const { timestamp: firstTimestamp, event_type: firstEventType, current_page: firstCurrentPage } = firstEvent;
    result.push({ timestamp: firstTimestamp, event_type: firstEventType, current_page: firstCurrentPage});
    
    // filter events with event_type equal to 3
    for (const event of events) {
      if (event.event_type === '3') {
        const { timestamp, event_type, current_page } = event;
        result.push({ timestamp, event_type, current_page });
      }
    }
  
    // add the last event to the result array
    const lastEvent = events[events.length - 1];
    const { timestamp: lastTimestamp, event_type: lastEventType, current_page: lastCurrentPage } = lastEvent;
    result.push({ timestamp: lastTimestamp, event_type: lastEventType, current_page: lastCurrentPage });

    const finaldata = [];
    for(let i = 1; i < result.length; i++)
    {
      const dif = result[i].timestamp - result[i -1].timestamp
      const d = {name: result[i-1].current_page, value: dif}
      finaldata.push(d);
    }
    return result;
  }

  function makeData(result: EventSubset[]): finalData[]{
    const finalData: finalData[] = [];
    
    for(let i = 1; i < result.length; i++)
    {
      const dif = result[i].timestamp - result[i -1].timestamp
      const d = {name: result[i-1].current_page, value: dif}
      for(let j = 1; j < finalData.length; j++)
      {
        if(d.name === finalData[j].name)
        {
          finalData[j].value += d.value;
          break;
        }
        else if(j === finalData.length-1){
          finalData.push(d);
        }
      }
      if(1 >= finalData.length){
        finalData.push(d);
      }
    
    }
    if(finalData[0].name == null)
    {
      finalData[0].name = "home_page"
    }
    return finalData;
  }


  const piedata = filterEventsWithType3(data);
  const f = makeData(piedata);

  return(
    <PieChart width={400} height={400}>
      <Pie
      data={f}
      cx="50%"
      cy="50%"
      labelLine={false}
      label={renderCustomizedLabel}
      outerRadius={100}
      fill="#8884d8"
      dataKey={dkOne}
    >
      {data.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
      </Pie>
      <Legend/>
      <Tooltip/>
    </PieChart>
  );
}

export default MyPieChart;