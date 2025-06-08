export default function TeamCard({ teamName, ownerName }) {
  return (
    <div className="team-card">
      <h3>{teamName}</h3>
      <p>Owner: {ownerName || 'Free Agent'}</p>
    </div>
  );
}
