function getRandomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toISOString()
}

function getRandomBool() {
  return Math.random() < 0.5
}

const senders = [
  {
    name: 'システム',
    avatar: {
      icon: 'mdi:server-security'
    }
  },
  {
    name: '自動通知',
    avatar: {
      icon: 'mdi:bell-alert'
    }
  },
  {
    name: '施設管理',
    avatar: {
      icon: 'mdi:home-heart'
    }
  },
  {
    name: '管理システム',
    avatar: {
      icon: 'mdi:shield-key'
    }
  }
]

const mockOshirase = [
  {
    id: 1,
    from: senders[0],
    subject: '新しい介護スタッフアカウントの作成について',
    body: `**定期健康診断のお知らせ**

以下の日程で健康診断を実施します。
- 日時：2024年11月25日（月）
- 場所：会議室B

ご都合の良い時間帯をお知らせください。`,
    date: new Date(),
    unread: getRandomBool()
  },
  {
    id: 2,
    from: senders[1],
    subject: '定例バックアップ完了通知',
    body: `<span style="color:red;"><b>【重要】新型コロナウイルス感染対策について</b></span><br/>
入館時は必ず消毒と検温を徹底してください。<br/>
引き続きマスクの着用をお願いいたします。`,
    date: new Date(),
    unread: getRandomBool()
  },
  {
    id: 3,
    from: senders[2],
    subject: '設備点検のお知らせ',
    body: `来週より介護食の<strong style="color:green;">新メニュー</strong>を提供開始します。\n\n・アレルギーがある場合は、\n 事前にご連絡ください。\n\n今後ともよろしくお願いいたします。`,
    date: getRandomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)),
    unread: getRandomBool()
  },
  {
    id: 4,
    from: senders[3],
    subject: 'システムメンテナンスのお知らせ',
    body: `12月1日深夜2時〜4時の間、システムが一時利用できなくなります。`,
    date: getRandomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)),
    unread: getRandomBool()
  },
  {
    id: 5,
    from: senders[3],
    subject: '介護記録システムの更新完了',
    body: `新しいバージョンの介護記録システムが適用されました。詳細はマニュアルをご覧ください。`,
    date: getRandomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)),
    unread: getRandomBool()
  },
  {
    id: 6,
    from: senders[0],
    subject: 'アカウント利用履歴の確認依頼',
    body: `不審なログインが検知されました。ご確認をお願いいたします。`,
    date: getRandomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)),
    unread: getRandomBool()
  },
  {
    id: 7,
    from: senders[1],
    subject: '緊急連絡テスト',
    body: `本メールは緊急時連絡網テストのため自動送信されています。`,
    date: getRandomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)),
    unread: getRandomBool()
  },
  {
    id: 8,
    from: senders[2],
    subject: '介護用品在庫不足アラート',
    body: `紙おむつの在庫が残りわずかです。納入をお願いします。`,
    date: getRandomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)),
    unread: getRandomBool()
  },
  {
    id: 9,
    from: senders[3],
    subject: '利用者データ一括ダウンロード準備完了',
    body: `ご依頼いただいた利用者データがダウンロード可能となりました。`,
    date: getRandomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)),
    unread: getRandomBool()
  },
  {
    id: 10,
    from: senders[3],
    subject: '介護記録記入忘れのお知らせ',
    body: `本日の一部利用者様について介護記録が未記入です。至急ご確認ください。`,
    date: getRandomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)),
    unread: getRandomBool()
  }
]
export default eventHandler(async () => {
  return mockOshirase
})
