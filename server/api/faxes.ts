function getRandomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toISOString()
}

function getRandomBool() {
  return Math.random() < 0.5
}

const faxSenders = [
  {
    name: '医療法人さくらクリニック',
    number: '03-1234-5678',
    company: 'さくらクリニック',
    department: '外来受付'
  },
  {
    name: '株式会社ケアサービス青葉',
    number: '045-234-8901',
    company: 'ケアサービス青葉',
    department: '連携担当'
  },
  {
    name: '城北総合病院',
    number: '048-456-1122',
    company: '城北総合病院',
    department: '地域連携課'
  },
  {
    name: '福祉用具センター',
    number: '06-9876-5432',
    company: '福祉用具センター',
    department: '受注窓口'
  }
]

const mockFaxes = [
  {
    id: 1,
    unread: getRandomBool(),
    sender: faxSenders[0],
    subject: '訪問診療指示書（11月）',
    summary: '11月分の訪問診療指示書が届いています。ご確認ください。',
    content: `11月の訪問診療指示書を送付いたします。<br />
  対象利用者：山田太郎様<br />
  次回訪問日時：11月12日 10:00<br /><br />
  変更点はございませんが、ご確認のうえご対応ください。`,
    receivedAt: getRandomDate(new Date(2024, 9, 1), new Date(2024, 10, 30)),
    pages: 3
  },
  {
    id: 2,
    unread: getRandomBool(),
    sender: faxSenders[1],
    subject: '12月度サービス提供票（案）',
    summary: '12月度サービス提供票案のご確認をお願いします。',
    content: `12月度のサービス提供票（案）を送付いたします。<br />
  内容ご確認の上、修正があれば11月20日までにご連絡ください。`,
    receivedAt: getRandomDate(new Date(2024, 9, 1), new Date(2024, 10, 30)),
    pages: 5
  },
  {
    id: 3,
    unread: getRandomBool(),
    sender: faxSenders[2],
    subject: '退院調整会議の議事録',
    summary: '先日の退院調整会議の議事録です。',
    content: `退院調整会議の議事録を送付いたします。<br />
  退院予定日は11月28日です。<br />
  在宅サービスの調整状況をご共有ください。`,
    receivedAt: getRandomDate(new Date(2024, 8, 15), new Date(2024, 10, 1)),
    pages: 2
  },
  {
    id: 4,
    unread: getRandomBool(),
    sender: faxSenders[3],
    subject: '福祉用具レンタル更新のご案内',
    summary: 'ご利用者様の福祉用具レンタル更新書類です。',
    content: `福祉用具レンタル更新のご案内です。<br />
  該当利用者：佐藤花子様<br />
  更新期限：12月5日<br /><br />
  更新手続きに必要な書類をご確認ください。`,
    receivedAt: getRandomDate(new Date(2024, 9, 10), new Date(2024, 10, 5)),
    pages: 4
  },
  {
    id: 5,
    unread: getRandomBool(),
    sender: faxSenders[1],
    subject: 'ケアマネ同行訪問のご依頼',
    summary: '12月の同行訪問に関する調整のご連絡です。',
    content: `同行訪問の件でご相談です。<br />
  候補日：12月4日、12月6日<br />
  ご都合の良い日時をご教示ください。`,
    receivedAt: getRandomDate(new Date(2024, 9, 22), new Date(2024, 10, 18)),
    pages: 1
  }
]

export default eventHandler(async () => {
  return mockFaxes
})
