import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts';

const colors = ["#26a69a", "#1565c0", "#fbc02d", "#7e57c2"]; // ألوان ثابتة حسب الترتيب

export default function GeneralBarChart({ data }) {
  return (
    <div className="w-full h-96 p-4 dark:bg-[#1c1c1c] bg-[#e0e0e0] rounded-lg shadow textcolre">
      <h3 className="text-lg font-semibold mb-4 text-center">Admin Dashboard Overview</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis dataKey="title" tick={{ fill: '#ccc', fontSize: 12 }} />
          <YAxis tick={{ fill: '#ccc' }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#333', border: 'none' }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend wrapperStyle={{ color: '#fff' }} />
          <Bar dataKey="count" name="statistices" isAnimationActive radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
