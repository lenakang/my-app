
interface ChartProps {
  coinId: string;
  coinPrice?: number;
}
function Price({ coinId, coinPrice }: ChartProps) {
  return (
    <div>
      <p>USD:{coinPrice}</p>
    </div>
  );
}

export default Price;