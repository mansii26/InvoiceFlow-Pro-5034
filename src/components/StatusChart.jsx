import ReactECharts from 'echarts-for-react';

export default function StatusChart({ data }) {
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      bottom: '0',
      left: 'center'
    },
    series: [
      {
        name: 'Invoice Status',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '16',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: data.pending, name: 'Pending', itemStyle: { color: '#f59e0b' } },
          { value: data.approved, name: 'Approved', itemStyle: { color: '#22c55e' } },
          { value: data.rejected, name: 'Rejected', itemStyle: { color: '#ef4444' } }
        ]
      }
    ]
  };

  return (
    <div className="h-[300px]">
      <ReactECharts option={option} style={{ height: '100%' }} />
    </div>
  );
}