const SendOptions=(MessageEmbed,message,name,prefix)=>{

  const embed = new MessageEmbed()
  .setTitle('Available Commands')
  .setURL('https://example.com')
  .setColor('#FF2D00')
  .setThumbnail('https://example.png')
  .setImage('https://example.png')
  .addFields({
    name: `${prefix}channel`,
    value: 'Create a new event channel',
    inline: false
  }, {
    name: `${prefix}event`,
    value: 'Create a new event',
    inline: false
  }, {
    name: `${prefix}reminder`,
    value: 'Configure automatic event reminders'
  }, {
    name: `${prefix}prefix`,
    value: `Change Prefix of The Command Channel,Send ${prefix}prefix-newPrefix`
  },{
    name: `${prefix}kick`,
    value: `Kick The User Out of The Channel,Send ${prefix}kick@member-reason`
  },
  {
    name: `${prefix}ban`,
    value: `Bans The User Out of The Channel,Send ${prefix}ban @member-reason`
  })
  .setTimestamp();

message.channel.send(embed);

/*
  return `Hey ${name} this is calendar ,I can do following things for you? \n
  1-To Create A New Event Channel ,Type ${prefix}channel+channelName.
  2-To Create A New Google Event ,Type ${prefix}event
  3-To Set A Reminder ,Type ${prefix}reminder
  4-To Change The Prefix Of The Bot ,Type ${prefix}prefix-newPrefix example ${prefix}prefix-logan`
  */


}

const createSimpleGuildMessage=(MessageEmbed,message,title,description,thumbnail,image)=>{
  const embed = new MessageEmbed()
  .setTitle(title)
  .setDescription(description)
  .setColor('#FF2D00')
  .setThumbnail(thumbnail)
  .setImage(image)
  .setTimestamp();

message.author.send(embed).catch(err=>{


});


}

const createSimpleGuildMessageWithLink=(MessageEmbed,message,title,description,start_date,end_date,url,channelName,client)=>{
  const embed = new MessageEmbed()
  .setTitle(title)
  .setDescription(description)
  .setThumbnail("https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F2%2F24%2FGoogle_Hangouts_Meet_icon_%25282017-2020%2529.png&imgrefurl=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AGoogle_Hangouts_Meet_icon_(2017-2020).png&tbnid=pSmsNT8PGRguCM&vet=12ahUKEwiiytf29__xAhVEDysKHZhaBEgQMygBegUIARCuAQ..i&docid=kG6suT0DoaOhdM&w=1024&h=1024&q=google%20meeting%20image%20thumbnail&ved=2ahUKEwiiytf29__xAhVEDysKHZhaBEgQMygBegUIARCuAQ")
 
  .setColor('#FF2D00')
  .setURL(url)
  .addFields([
    {
      "name":"Start Date",
      "value":start_date,
      inline:true
    },
    {
      "name":"End Date",
      "value":end_date,
      inline:true
    }
  ])
 .setTimestamp();



const channell = client.channels.cache.find(channel => channel.name === channelName);
channell.send(embed);

}




const getTimeZonesList=()=>{


  return [
    "Asia/Aden",
    "Asia/Almaty",
    "Asia/Amman",
    "Asia/Anadyr",
    "Asia/Aqtau",
    "Asia/Aqtobe",
    "Asia/Ashgabat",
    "Asia/Ashkhabad",
    "Asia/Atyrau",
    "Asia/Baghdad",
    "Asia/Bahrain",
    "Asia/Baku",
    "Asia/Bangkok",
    "Asia/Barnaul",
    "Asia/Beirut",
    "Asia/Bishkek",
    "Asia/Brunei",
    "Asia/Calcutta",
    "Asia/Chita",
    "Asia/Choibalsan",
    "Asia/Chongqing",
    "Asia/Chungking",
    "Asia/Colombo",
    "Asia/Dacca",
    "Asia/Damascus",
    "Asia/Dhaka",
    "Asia/Dili",
    "Asia/Dubai",
    "Asia/Dushanbe",
    "Asia/Famagusta",
    "Asia/Gaza",
    "Asia/Harbin",
    "Asia/Hebron",
    "Asia/Ho_Chi_Minh",
    "Asia/Hong_Kong",
    "Asia/Hovd",
    "Asia/Irkutsk",
    "Asia/Istanbul",
    "Asia/Jakarta",
    "Asia/Jayapura",
    "Asia/Jerusalem",
    "Asia/Kabul",
    "Asia/Kamchatka",
    "Asia/Karachi",
    "Asia/Kashgar",
    "Asia/Kathmandu",
    "Asia/Katmandu",
    "Asia/Khandyga",
    "Asia/Kolkata",
    "Asia/Krasnoyarsk",
    "Asia/Kuala_Lumpur",
    "Asia/Kuching",
    "Asia/Kuwait",
    "Asia/Macao",
    "Asia/Macau",
    "Asia/Magadan",
    "Asia/Makassar",
    "Asia/Manila",
    "Asia/Muscat",
    "Asia/Nicosia",
    "Asia/Novokuznetsk",
    "Asia/Novosibirsk",
    "Asia/Omsk",
    "Asia/Oral",
    "Asia/Phnom_Penh",
    "Asia/Pontianak",
    "Asia/Pyongyang",
    "Asia/Qatar",
    "Asia/Qostanay",
    "Asia/Qyzylorda",
    "Asia/Rangoon",
    "Asia/Riyadh",
    "Asia/Saigon",
    "Asia/Sakhalin",
    "Asia/Samarkand",
    "Asia/Seoul",
    "Asia/Shanghai",
    "Asia/Singapore",
    "Asia/Srednekolymsk",
    "Asia/Taipei",
    "Asia/Tashkent",
    "Asia/Tbilisi",
    "Asia/Tehran",
    "Asia/Tel_Aviv",
    "Asia/Thimbu",
    "Asia/Thimphu",
    "Asia/Tokyo",
    "Asia/Tomsk",
    "Asia/Ujung_Pandang",
    "Asia/Ulaanbaatar",
    "Asia/Ulan_Bator",
    "Asia/Urumqi",
    "Asia/Ust-Nera",
    "Asia/Vientiane",
    "Asia/Vladivostok",
    "Asia/Yakutsk",
    "Asia/Yangon",
    "Asia/Yekaterinburg",
    "Asia/Yerevan",
    "Australia/ACT",
    "Australia/Adelaide",
    "Australia/Brisbane",
    "Australia/Broken_Hill",
    "Australia/Canberra",
    "Australia/Currie",
    "Australia/Darwin",
    "Australia/Eucla",
    "Australia/Hobart",
    "Australia/LHI",
    "Australia/Lindeman",
    "Australia/Lord_Howe",
    "Australia/Melbourne",
    "Australia/NSW",
    "Australia/North",
    "Australia/Perth",
    "Australia/Queensland",
    "Australia/South",
    "Australia/Sydney",
    "Australia/Tasmania",
    "Australia/Victoria",
    "Australia/West",
    "Australia/Yancowinna",
    "Europe/Amsterdam",
    "Europe/Andorra",
    "Europe/Astrakhan",
    "Europe/Athens",
    "Europe/Belfast",
    "Europe/Belgrade",
    "Europe/Berlin",
    "Europe/Bratislava",
    "Europe/Brussels",
    "Europe/Bucharest",
    "Europe/Budapest",
    "Europe/Busingen",
    "Europe/Chisinau",
    "Europe/Copenhagen",
    "Europe/Dublin",
    "Europe/Gibraltar",
    "Europe/Guernsey",
    "Europe/Helsinki",
    "Europe/Isle_of_Man",
    "Europe/Istanbul",
    "Europe/Jersey",
    "Europe/Kaliningrad",
    "Europe/Kiev",
    "Europe/Kirov",
    "Europe/Lisbon",
    "Europe/Ljubljana",
    "Europe/London",
    "Europe/Luxembourg",
    "Europe/Madrid",
    "Europe/Malta",
    "Europe/Mariehamn",
    "Europe/Minsk",
    "Europe/Monaco",
    "Europe/Moscow",
    "Europe/Nicosia",
    "Europe/Oslo",
    "Europe/Paris",
    "Europe/Podgorica",
    "Europe/Prague",
    "Europe/Riga",
    "Europe/Rome",
    "Europe/Samara",
    "Europe/San_Marino",
    "Europe/Sarajevo",
    "Europe/Saratov",
    "Europe/Simferopol",
    "Europe/Skopje",
    "Europe/Sofia",
    "Europe/Stockholm",
    "Europe/Tallinn",
    "Europe/Tirane",
    "Europe/Tiraspol",
    "Europe/Ulyanovsk",
    "Europe/Uzhgorod",
    "Europe/Vaduz",
    "Europe/Vatican",
    "Europe/Vienna",
    "Europe/Vilnius",
    "Europe/Volgograd",
    "Europe/Warsaw",
    "Europe/Zagreb",
    "Europe/Zaporozhye",
    "Europe/Zurich",
    "US/Alaska",
    "US/Aleutian",
    "US/Arizona",
    "US/Central",
    "US/East-Indiana",
    "US/Eastern",
    "US/Hawaii",
    "US/Indiana-Starke",
    "US/Michigan",
    "US/Mountain",
    "US/Pacific",
    "US/Pacific-New",
    "US/Samoa",
    "UTC",
   
  ]
}

module.exports={
  SendOptions,
    getTimeZonesList,
    createSimpleGuildMessage,
    createSimpleGuildMessageWithLink
}

