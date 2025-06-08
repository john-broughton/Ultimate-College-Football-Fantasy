export default function PlayerSummary({ name, score, balance }) {
  return (
    <div className="flex justify-between items-center">
      <div className="text-lg font-medium">{name}</div>
      <div className="text-sm text-gray-600">
        <p>Score: {score}</p>
        <p>Balance: ${balance}</p>
      </div>
    </div>
  );
}