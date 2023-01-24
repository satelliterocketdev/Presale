import './TeamSection.scss';

const team = [
  {
    name: 'Michael Le',
    title: 'Co-Founder & CCO',
    pic: '/img/team/michael.jpg',
    bio: "Leading web3 innovator with a consistent track record of seeing what's next before the masses. With a loyal social following of 55MM+, Le is one of the most influential creators on the planet."
  },
  {
    name: 'Robin DeFay',
    title: 'Co-Founder & CEO',
    pic: '/img/team/robin.jpg',
    bio: "Tech entrepreneur and lifelong gamer with a background in patenting tech products. Since 2017, a passion for disruptive and evolutionary technology led his focus to blockchain, gamefi & metaverse."
  },
  {
    name: 'Paul Jin',
    title: 'CTO',
    pic: '/img/team/paul.jpg',
    bio: "With over 18 projects built out, including the development of the Kucoin trading algorithm, Paul is a pioneer of smart contract engineering and blockchain platforms."
  }
]

const TeamSection = () => {
  return (
    <section className="team-section">
      <h2>Our Team</h2>
      {/* <p>Our DAO focuses on the best investments in crypto gaming &amp; meta verse economies to generate the highest yield for our holders.</p> */}
      <div className='grid-part'>
        {team.map(item => (
          <div className='item'>
            <div className='pic' style={{ backgroundImage: `url(${item.pic})` }} />
            <div className='name'>{item.name}</div>
            <div className='title'>{item.title}</div>
            <div className='bio'>{item.bio}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
