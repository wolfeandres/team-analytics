import { Label, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceLine, Area, ReferenceArea, ComposedChart } from 'recharts';

function findTimestampRanges(data: any[], min: number, max: number, selected: string, type: number): [number, number][] {
    const ranges: [number, number][] = [];
    let currentRangeStart: number | null = null;
  
    if (selected === 'heart_rate') {
        if (type === 0) {
            for (const { timestamp, heartRate1} of data) {
              if (heartRate1 >= min && heartRate1 <= max) {
                if (currentRangeStart === null) {
                  currentRangeStart = timestamp;
                }
              } else {
                if (currentRangeStart !== null) {
                  ranges.push([currentRangeStart, timestamp]);
                  currentRangeStart = null;
                }
              }
            }
        } else {
            for (const { timestamp, heartRate2} of data) {
                if (heartRate2 >= min && heartRate2 <= max) {
                  if (currentRangeStart === null) {
                    currentRangeStart = timestamp;
                  }
                } else {
                  if (currentRangeStart !== null) {
                    ranges.push([currentRangeStart, timestamp]);
                    currentRangeStart = null;
                  }
                }
            }
        }
    } else if (selected === 'distance') {
        if (type === 0) {
            for (const { timestamp, distance1} of data) {
              if (distance1 >= min && distance1 <= max) {
                if (currentRangeStart === null) {
                  currentRangeStart = timestamp;
                }
              } else {
                if (currentRangeStart !== null) {
                  ranges.push([currentRangeStart, timestamp]);
                  currentRangeStart = null;
                }
              }
            }
        } else {
            for (const { timestamp, distance2} of data) {
                if (distance2 >= min && distance2 <= max) {
                  if (currentRangeStart === null) {
                    currentRangeStart = timestamp;
                  }
                } else {
                  if (currentRangeStart !== null) {
                    ranges.push([currentRangeStart, timestamp]);
                    currentRangeStart = null;
                  }
                }
            }
        }
    } else if (selected === 'steps') {
        if (type === 0) {
            for (const { timestamp, steps1} of data) {
              if (steps1 >= min && steps1 <= max) {
                if (currentRangeStart === null) {
                  currentRangeStart = timestamp;
                }
              } else {
                if (currentRangeStart !== null) {
                  ranges.push([currentRangeStart, timestamp]);
                  currentRangeStart = null;
                }
              }
            }
        } else {
            for (const { timestamp, steps2} of data) {
                if (steps2 >= min && steps2 <= max) {
                  if (currentRangeStart === null) {
                    currentRangeStart = timestamp;
                  }
                } else {
                  if (currentRangeStart !== null) {
                    ranges.push([currentRangeStart, timestamp]);
                    currentRangeStart = null;
                  }
                }
            }
        }
    } else if (selected === 'calories') {
        if (type === 0) {
            for (const { timestamp, calories1} of data) {
              if (calories1 >= min && calories1 <= max) {
                if (currentRangeStart === null) {
                  currentRangeStart = timestamp;
                }
              } else {
                if (currentRangeStart !== null) {
                  ranges.push([currentRangeStart, timestamp]);
                  currentRangeStart = null;
                }
              }
            }
        } else {
            for (const { timestamp, calories2} of data) {
                if (calories2 >= min && calories2 <= max) {
                  if (currentRangeStart === null) {
                    currentRangeStart = timestamp;
                  }
                } else {
                  if (currentRangeStart !== null) {
                    ranges.push([currentRangeStart, timestamp]);
                    currentRangeStart = null;
                  }
                }
            }
        }
    } else if (selected === 'speed') {
        if (type === 0) {
            for (const { timestamp, speed1} of data) {
              if (speed1 >= min && speed1 <= max) {
                if (currentRangeStart === null) {
                  currentRangeStart = timestamp;
                }
              } else {
                if (currentRangeStart !== null) {
                  ranges.push([currentRangeStart, timestamp]);
                  currentRangeStart = null;
                }
              }
            }
        } else {
            for (const { timestamp, speed2} of data) {
                if (speed2 >= min && speed2 <= max) {
                  if (currentRangeStart === null) {
                    currentRangeStart = timestamp;
                  }
                } else {
                  if (currentRangeStart !== null) {
                    ranges.push([currentRangeStart, timestamp]);
                    currentRangeStart = null;
                  }
                }
            }
        }
    } else if (selected === 'power') {
        if (type === 0) {
            for (const { timestamp, power1} of data) {
              if (power1 >= min && power1 <= max) {
                if (currentRangeStart === null) {
                  currentRangeStart = timestamp;
                }
              } else {
                if (currentRangeStart !== null) {
                  ranges.push([currentRangeStart, timestamp]);
                  currentRangeStart = null;
                }
              }
            }
        } else {
            for (const { timestamp, power2} of data) {
                if (power2 >= min && power2 <= max) {
                  if (currentRangeStart === null) {
                    currentRangeStart = timestamp;
                  }
                } else {
                  if (currentRangeStart !== null) {
                    ranges.push([currentRangeStart, timestamp]);
                    currentRangeStart = null;
                  }
                }
            }
        }
    }
  
    if (currentRangeStart !== null) {
      ranges.push([currentRangeStart, data[data.length - 1].timestamp]);
    }
  
    console.log(ranges)
    return ranges;
}

type ChartProps = {
    data: any[];
    json1: any;
    options: any;
    query: any;
    type: number;
}

interface Labels {
    [key: string]: string[];
}

const labels: Labels = {
    'heart_rate': ['Heart Rate', 'bpm'],
    'distance': ['Distance', 'm'],
    'steps': ['Steps', 'steps'],
    'calories': ['Calories', 'kcal'],
    'speed': ['Speed', 'km/h']
}

const MyIComposedChart = ( props: ChartProps ) => {
    const { data, json1, options, query, type } = props;

    const ranges = findTimestampRanges(data, query.min, query.max, query.selected, type)

    return (
            <ComposedChart
            width={700}
            height={525}
            data={data}
            margin={{
                top: 60,
                right: 15,
                left: 5,
                bottom: 20,
            }}
        >
            <defs>
                <linearGradient id="elevation" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#66d0de" stopOpacity={0.5}/>
                <stop offset="95%" stopColor="#66d0de" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey='timestamp' stroke="black">
                <Label value="Time" offset={-10} position="insideBottomLeft" />
            </XAxis>
            <YAxis hide={!options['heart_rate']} yAxisId={0} allowDecimals={false} domain={options['heart_rate'] ? ['auto', json1['workout']['heart_rate']['target_heart_rate'] + 5]: ['dataMin - 5', 'dataMax + 5']}>
                <Label value={labels['heart_rate'][0] + ' (' + labels['heart_rate'][1] + ')'} offset={20} position= 'insideBottomLeft' angle={-90}/>
            </YAxis>
            <YAxis hide yAxisId={1} dataKey='elevation' domain={['auto', 'auto']}/>
            <YAxis hide={!options['distance']} yAxisId={2} domain={['auto', 'auto']}>
                <Label value={labels['distance'][0] + ' (' + labels['distance'][1] + ')'} offset={20} position= 'insideBottomLeft' angle={-90}/>
            </YAxis>
            <YAxis hide={!options['steps']} yAxisId={3} domain={['auto', 'auto']}>
                <Label value={labels['steps'][0]} offset={20} position= 'insideBottomLeft' angle={-90}/>
            </YAxis>
            <YAxis hide={!options['calories']} yAxisId={4} domain={['auto', 'auto']}>
                <Label value={labels['calories'][0] + ' (' + labels['calories'][1] + ')'} offset={20} position= 'insideBottomLeft' angle={-90}/>
            </YAxis>
            <YAxis hide={!options['speed']} yAxisId={5} domain={['auto', 'auto']}>
                <Label value={labels['speed'][0] + ' (' + labels['speed'][1] + ')'} offset={20} position= 'insideBottomLeft' angle={-90}/>
            </YAxis>
            <Tooltip />
            <Legend />
            <ReferenceLine y={options['heart_rate'] ? json1['workout']['heart_rate']['target_heart_rate'] : null} label={options['heart_rate'] ? "Target" : ''} stroke="#8884d8" ifOverflow='extendDomain' />
            <Area hide={!options['elevation']} unit='m' type='monotone' name='Elevation' yAxisId={1} dataKey='elevation' stroke='#66d0de' fill='url(#elevation)' fillOpacity={1}/>
            <Line hide={!options['heart_rate']} unit={labels['heart_rate'][1]} name={json1['name']} type="monotone" dataKey={type === 0 ? 'heartRate1' : 'heartRate2'} stroke="#8884d8" yAxisId={0} dot={false}/>
            <Line hide={!options['distance']} unit={labels['distance'][1]} name={json1['name']} type="monotone" dataKey={type === 0 ? 'distance1' : 'distance2'} stroke="#9240de" yAxisId={2} dot={false}/>
            <Line hide={!options['steps']} unit={labels['steps'][1]} name={json1['name']} type="monotone" dataKey={type === 0 ? 'steps1' : 'steps2'} stroke="#de4077" yAxisId={3} dot={false}/>
            <Line hide={!options['calories']} unit={labels['calories'][1]} name={json1['name']} type="monotone" dataKey={type === 0 ? 'calories1' : 'calories2'} stroke="#55e081" yAxisId={4} dot={false}/>
            <Line hide={!options['speed']} unit={labels['speed'][1]} name={json1['name']} type="monotone" dataKey={type === 0 ? 'speed1' : 'speed2'} stroke="#fa9b48" yAxisId={5} dot={false}/>
            {ranges.map((range, index) => (
                <ReferenceArea key={index} x1={range[0]} x2={range[1]} stroke='red' strokeOpacity={0.3}/>
            ))}
        </ComposedChart>
    )
}

export default MyIComposedChart;