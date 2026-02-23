export default function ContributorCard({ contributor }) {
  const { name, github, role, bio } = contributor

  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const avatarUrl = github
    ? `https://github.com/${github}.png?size=96`
    : null

  return (
    <article className="card">
      <div className="card-header">
        <div className="card-avatar">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${name}'s GitHub avatar`}
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.textContent = initials
              }}
            />
          ) : (
            initials
          )}
        </div>
        <div>
          <div className="card-name">{name}</div>
          {github && (
            <a
              className="card-github"
              href={`https://github.com/${github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{github}
            </a>
          )}
        </div>
      </div>

      {role && <span className="card-role">{role}</span>}
      {bio && <p className="card-bio">{bio}</p>}
    </article>
  )
}
