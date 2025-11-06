const members = [{
  name: 'Lan Nguyen',
  username: 'lan.nguyen',
  role: 'owner',
  avatar: { src: 'https://i.pravatar.cc/128?u=lan.nguyen' }
}, {
  name: 'Noah Bennett',
  username: 'noah.bennett',
  role: 'member',
  avatar: { src: 'https://i.pravatar.cc/128?u=noah.bennett' }
}, {
  name: 'Amelia Tran',
  username: 'amelia.tran',
  role: 'member',
  avatar: { src: 'https://i.pravatar.cc/128?u=amelia.tran' }
}, {
  name: 'Sofia Martinez',
  username: 'sofia.martinez',
  role: 'owner',
  avatar: { src: 'https://i.pravatar.cc/128?u=sofia.martinez' }
}, {
  name: 'Ethan Park',
  username: 'ethan.park',
  role: 'member',
  avatar: { src: 'https://i.pravatar.cc/128?u=ethan.park' }
}, {
  name: 'Priya Sharma',
  username: 'priya.sharma',
  role: 'member',
  avatar: { src: 'https://i.pravatar.cc/128?u=priya.sharma' }
}, {
  name: 'Jonah Reed',
  username: 'jonah.reed',
  role: 'member',
  avatar: { src: 'https://i.pravatar.cc/128?u=jonah.reed' }
}, {
  name: 'Mia Chen',
  username: 'mia.chen',
  role: 'member',
  avatar: { src: 'https://i.pravatar.cc/128?u=mia.chen' }
}, {
  name: 'Oliver Rivera',
  username: 'oliver.rivera',
  role: 'member',
  avatar: { src: 'https://i.pravatar.cc/128?u=oliver.rivera' }
}, {
  name: 'Grace Ito',
  username: 'grace.ito',
  role: 'member',
  avatar: { src: 'https://i.pravatar.cc/128?u=grace.ito' }
}, {
  name: 'Camila Torres',
  username: 'camila.torres',
  role: 'owner',
  avatar: { src: 'https://i.pravatar.cc/128?u=camila.torres' }
}]

export default eventHandler(async () => {
  return members
})
