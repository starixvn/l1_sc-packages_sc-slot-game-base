## [3.1.1](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v3.1.0...v3.1.1) (2025-10-02)


### Bug Fixes

*  assign idCountersConsumer.consume to gameData.roundId  - Epic GL-5369 - Epic GL-5369 - Epic GL-5369 ([157f164](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/157f1641de051d26842e602a4861e5c728f8fdbc))
* sc-game-base@6.2.0 - Epic GL-5369 ([bd5e93d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/bd5e93d8c95a14eef36ba6e76054452f0e2f3f2f))
* update generateBetInfo: assign gameData.roundId value, formatApiBetInfo: assign payload.roundId value instead of using gameData.roundId - Epic GL-5369 ([5963459](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/59634597397e6e1664177e931ef9b0bc5e2508bd))

# [3.1.0](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v3.0.0...v3.1.0) (2025-09-11)


### Bug Fixes

* bug auto settle bonus ingame - GL - 4625 ([27f46aa](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/27f46aa817fabf3f910eb64a03c999d19eb51f38))
* bug handleBonusInGame in FSB - GL - 4670 ([c2363c2](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c2363c28d4c4b4ac44955cc291cc799d508aa987))
* bug handleBonusInGame in FSB - GL - 4670 ([bf70064](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/bf70064503a96a5d48c5c4099571ba0ec96a8e4f))
* bug handleBonusInGame in FSB - GL - 4670 ([1c7d1f8](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/1c7d1f8a61d7eafe4fbd373ecee121fa21769e48))
* handleBonusInGame - add baseWinAmount sc-game-base@6.0.2-beta.13 - Epic GL-4670 - Epic GL-4670 ([9071e09](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/9071e09d96005f8a79abf2cb279356d6add01553))
* unit test fail ([eb4394e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/eb4394e267cb85722fa654eacfa0fb876f10fba5))


### Features

* get all promotion running ([1f22242](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/1f222423e609c3a8e2e7c05c2efe0096bb848379))
* promotion ticket - add base currency amount - Epic GL-4670 ([cb41c55](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/cb41c55179dcdeb3e6a8a891cbdd1ef4200c3956))
* remove log unuse - GL - 4625 ([9064bbc](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/9064bbc2d55d5dd1ac090d34f3e62e8a764ca603))
* update version sc-game-base 6.0.2-beta.4 ([ae5ae8b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/ae5ae8bba6c90b86ec8b2642c366e9e575df8807))
* update version sc-game-base 6.0.2-beta.6 ([424795b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/424795b2f36db1a1adbf0f708671f0019fc70281))
* update version sc-game-base 6.0.2-beta.8 - GL - 4625 ([14756c5](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/14756c5bb529e73e7a28dd80af0330421cfadddc))

# [3.0.0](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v2.2.0...v3.0.0) (2025-08-25)


### Bug Fixes

* add promotion to place-bet-consumer ([b075226](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/b07522681a75a1134139859eb0467593e3f216e2))
* code smell ([ed81310](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/ed81310a8f714d37d816233f8768b6668657ffb6))
* code smell ([105f766](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/105f766ad062ae4c81ba6ad39121d2810fb4e0eb))
* code smell redundant await ([a891597](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/a891597370827c9092051956298f9102979255a3))
* code smells ([1569b61](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/1569b616e34181f85dcdeaadf31062ea5668ded4))
* correct gamePromotionApiClient injection in signin consumer ([8da8bf0](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/8da8bf0a097f6ca3048c3978830c5349052b3683))
* init promotion.bonua value in user sign in ([b6f1bde](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/b6f1bde01bda103c3b0364cd2dc22eff149eb493))
* register promotion client and interceptor with proxy ([004162d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/004162d6bde195280a89dc3f3d7bfb66137721ee))
* register promotion client and interceptor with proxy ([849b8d9](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/849b8d9f00041549971962a62d09be69f5a68420))
* remove redeemConsumer in socket router ([6b5ac5b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6b5ac5b7a46409bbaf92f95c88696285aca2c50a))
* remove redeemConsumer in socket router ([6bf16d3](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6bf16d3e357449371c1d2b6112007df0f821d642))
* remove registerPromotionServices ([de3162b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/de3162b4d58c1b0bc9630159e23d2cfb772034a9))
* remove unnecessary publishers registrations ([eab081e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/eab081ed4d3117a425a13ee332fef8a4e7d8feca))
* remove unused betTime ([7c1785f](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/7c1785f00049794aa072081514ad345e75bfa4b4))
* socket router - add bonusWinConsumer to constructor ([561a036](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/561a036bf675bca326682ce37b303ed2dfc714c3))
* unit test ([5c4b99f](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/5c4b99f49fc58ecb98c3b0f286c758dd1542f465))
* unit test fail ([1505533](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/150553362051f45d69f705064457eba49b33557f))
* update promotion api client and bet interceptor injection ([638257c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/638257c3ecdf9f0d281bed35fdc12a675d764d70))
* update promotion expiry in game cron ([86920cf](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/86920cf9ec0ad7055d446433fe64717ecf9e96c0))
* upgrade sc-game-base@5.5.1-beta.15 ([5047ab9](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/5047ab989128f8b8efb9b68e44992d603a2f5b0e))
* upgrade sc-game-base@5.5.1-beta.16 ([6da253a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6da253a17970f35bfc596ef608ffe7321759bbe6))
* upgrade sc-game-base@5.5.1-beta.17 ([d4ed1ab](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d4ed1ab0be6a65b6d459f2f1b99eda4c2f7fa4be))
* upgrade sc-game-base@5.5.1-beta.18 ([4db2d14](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/4db2d1453d702b64080093eb6dc5d952d08c199a))
* upgrade sc-game-base@5.5.1-beta.19 ([504314b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/504314bc09a4c9410979bfc2601d8110d08bf05c))
* upgrade sc-game-base@5.5.1-beta.2 ([4f26cd5](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/4f26cd586a70ff989b7f1da5ea534e9edb05b1db))
* upgrade sc-game-base@5.5.1-beta.20 ([1660f75](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/1660f754be4e76316fd91271593e49db9ef38eb8))
* upgrade sc-game-base@5.5.1-beta.21 ([d8baabb](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d8baabb82bad2993033173e7e2a7038565cec8db))
* upgrade sc-game-base@5.5.1-beta.3 ([e4f8b1d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/e4f8b1d5211356306f634a43739cec8ce5c82051))
* upgrade sc-game-base@5.5.1-beta.4 ([409ba39](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/409ba39f45f75881c9f95bbc40f0d704e1431538))
* upgrade sc-game-base@5.5.1-beta.5 ([8b1cf43](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/8b1cf43a4e1fd889d457d6d3ea9cd38e46f27296))
* upgrade sc-game-base@5.5.1-beta.6 ([16ccbdd](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/16ccbdd75b9efd73c2c7eb0b8f90ba9d219204be))
* upgrade sc-game-base@5.5.1-beta.7 ([0d64fab](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/0d64fabea23456c0e109db932c95dcc093f2b061))
* upgrade sc-game-base@5.5.1-beta.9 ([9b83edd](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/9b83eddcaef8bd00617eb98016ced9ccec00aa9a))
* upgrade sc-game-base@6.0.0-beta.1 ([2ee3f05](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/2ee3f0570c61190b32a140e021c187da25814529))
* upgrade sc-game-base@6.0.0-beta.106 ([b84aa9d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/b84aa9d680d13820239bc19fd6d7c169bd1ecaa0))
* upgrade sc-game-base@6.0.0-beta.2 ([86125f5](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/86125f544cc2df0ad6c142c7b8bf3d7b92b44238))
* upsert bet - add sitename ([da0b8af](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/da0b8afaa4288cc1b7b76f415bdf6afe65606c47))


### Features

* add  promotionId when create promotion ticket ([f30bf87](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f30bf87af6710fd31042b03d72dc3f50b9c9fa74))
* add app type for rounds ([810fa7e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/810fa7e82d95681f712dd0a8e48b4c6ee068df5a))
* add betwin for data consistency ([edc6429](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/edc6429e5d43e1241e53ffe43741e21af180dbef))
* add cron end promotion ([882ce10](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/882ce10c2d9f430c722b244852733ad38d474494))
* add cron notify end promotion ([be14fe4](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/be14fe49e17d510b25db368f06a8364a62519967))
* add flow promotion free spin ([b9001fa](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/b9001fa500d048d9e3aee4da0392bacc7fb2b29b))
* add flow promotion free spin ([b37284d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/b37284d4ae9806624b1159931bcf498b0801366f))
* add promotion free spin ([dd2710e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/dd2710e97b08efd1ca8596c545b9f9ded622114d))
* add promotion id for free spin promotion extra ([356a73c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/356a73c4bf493d55099ffa0d9923600294ffd17f))
* add promotion id for rounds ([ac9e4dd](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/ac9e4dd1b6d8904b1f804201fbfb82fee590cad2))
* add router redeem promotion ([9081b91](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/9081b915a51dc1edc647908717a35d6ef8599b33))
* add sessionId to rounds ([35abb77](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/35abb7717075b028ae32a0b473ef1f49ba786a3e))
* add site-name for deduct bonus item ([6792fb2](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6792fb2e0082f36e44750a0a4189a2a496ccdbdd))
* add user tracking client ([5c6a2e3](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/5c6a2e38ad4863db15aa80de31c90675f212f113))
* call end promotion when settle bet ([c4b50d4](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c4b50d49aaaf49ad31f957cf998a566db88a86ef))
* change compose promotion validation criteria ([b98dcd4](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/b98dcd40375edcc860e41b95326be5d4bb617f05))
* change expiry time for extra free spin ([5082680](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/5082680757afa1b35a39bde5b8fcdadb6026bc2a))
* change logic handle end promotion ([1fb6471](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/1fb64711c44ff5927c8b30ee2f9c4616ab1d08f0))
* change logic handle end promotion ([c25a665](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c25a66597f15f5cc54c8e126285e351035562b81))
* check complete promotion ([c2c6423](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c2c6423c846c419e7688d548c6b12ee32190c0dd))
* check expiry time for free spins ([ebd4ae3](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/ebd4ae3b0b64ef1d10fe615ff81e7cf0ca154904))
* check extra free spin bonus ([04150d1](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/04150d12311357bb4083d42cb2b2043e5251c260))
* check extra free spin bonus ([7a3bdb9](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/7a3bdb9466bebd3b59647a059f8a5892c36b9310))
* check extra free spin bonus ([02f5718](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/02f571883e37c468d75b14ca25728535b4b03936))
* check free Spin Available promotion before deduct bonus ([298e89b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/298e89be3f52ae0226022fc525474675f69f09d4))
* check free spin extra before end promotion ([bec1949](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/bec1949b4451beb5076b0959c781df90547eebe4))
* check free spin extra before end promotion ([3b2b520](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/3b2b5201856cefa28857e56a89b422fcf46d34ed))
* check free spin extra promotion ([f98b416](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f98b416bf761d5cf9ee033f1f5a230b123b48aae))
* check free spin extra promotion ([38c2340](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/38c23408ab01a1559097685e4d3099929ff867bd))
* check promotion before updatePlayerPromotionFreeSpins ([1ffd233](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/1ffd2335be127d1d4a963065fe8a894284496840))
* check promotion complete ([c643731](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c6437319719c0a5383d988c14fc486c2611ac838))
* check promotion completed ([cf7f50d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/cf7f50d96082a1c3f1dd92044e25f67f5032a1f6))
* check promotion completed ([767e6db](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/767e6db7ee4b76827a0b18b80dd611638d4a8142))
* check Promotion Free Spins Expiry ([2b49869](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/2b49869dd1221e8bd95e3e06a0fafca818db1494))
* check promotion offer game ([a1c1f3e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/a1c1f3ecdff594b0ae6981063d4574a577dc6bc0))
* check promotions available ([0c57cb8](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/0c57cb8136f3461975ca946321ee065f344828b3))
* check use promotion ([9160c2d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/9160c2d971af01d2186d5411e3e892d293ee7e52))
* convert date for expiryTime ([b442a4d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/b442a4dcebf622703d96ad19ef28d3ad1c6dda27))
* deduct extra free spin ([19f6230](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/19f623075f37e07f1be2669f200893a2e3a4bbd9))
* edit flow promotion free spin detail logic ([f30abe9](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f30abe95c7046d6fa36c8bbcade6ac2e6105334d))
* enhance cron handle promotion free spins expiry ([f92d54a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f92d54a9fa0978eefab2381cbe83baa6a3b98e29))
* enhance cron handle promotion free spins expiry ([fca5329](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/fca5329990a60d66d8a7b1aa8bb0fbff27361310))
* enhance handle in game ([83c2099](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/83c20991d80a2476081b549715f1a069462ba4ab))
* enhance handle promotion free spins expiry ([764b9a1](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/764b9a153a2b155e8288b7aba582d797b32ca467))
* executeInterceptorEvent after settlement ([fa6543c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/fa6543c98cc1d816323064054dca428622a35619))
* format finish promotion ([c7b3529](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c7b3529ee4cd56d305cfd41b4622778d33e7117b))
* get available free spins ([1fc31eb](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/1fc31ebcbcb3f12984af36d76650f018b54e8ee2))
* get free spin available ([d3dd4bd](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d3dd4bd45bf4df57018e4fb7307a53bd5384ce79))
* get free spin available ([763adc7](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/763adc7a3d7515e9b5450983bf16871ea7cb2f05))
* get player for before Event promotion ([2a7fea0](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/2a7fea0a7e87fc969b922220f1796833b4ee011b))
* get promotion to progress ([29e3924](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/29e3924d4ef4a6d1ccc968223ea46625d56a34bd))
* get promotion TO Progress ([df539dc](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/df539dc92109e6d00f8d29cccdd25a60cf47e1eb))
* handle end promotion ([8e09b89](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/8e09b89c44f939a9fef030f651408d00d26154c3))
* handle end promotion free spins ([4cf8e95](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/4cf8e951d05ee54b24f42c44ea7ab02231edf30e))
* handle end promotion free spins ([027c8bd](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/027c8bdb2f78066e22b6ad7a2e9c9ddd5aab12c8))
* handle end promotion free spins ([c37278c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c37278c9f17c108f9063959603c06c04de93494f))
* handle free spin in game ([00518ab](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/00518ab41686ae7a289244e8d6765b132c4c0288))
* handle place bet promotion free spin extra ([89c06bb](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/89c06bb27352c51fc0e4c916ebe4170dc4e178f5))
* handle Promotion Slot Game Logic ([203925a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/203925a7afb26d8f07fc04882159fcc47452ea6d))
* ignore cron end promotion ([cb1aff5](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/cb1aff5c7b0d42c5821bbd96528c84bbebe344a5))
* implement update promotion ticket ([9c88c7a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/9c88c7a809ec324f5f243bbe16d2e5b901514da2))
* include promotion in ingame payload ([490da0f](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/490da0f291e124e6604b8dcc5dfea021f44103e8))
* include promotionId into place bet api ([90f86fa](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/90f86faa6126c4a987309d4664875c84b55fc114))
* inject game data promotion free spin consumer ([4892f6c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/4892f6c10b258b96cf2c66ae8a8dba877778acb1))
* inject user tracking to in-game-consumer ([7346ea5](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/7346ea50f6af72037be29cb2e0498a2a624c7b1c))
* integrate tracking to out-game-consumer ([fb2d026](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/fb2d026c64a50004de1822b44ca89e44b3b01d4b))
* refactor code slot game logic ([686a838](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/686a8386c217ad79c3eb52f36a3392c946b61727))
* refactor code slot game logic ([20ab539](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/20ab539f7b1604b4aa80a693b2a1d4eda71d37f8))
* register promotion publisher ([59716e3](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/59716e383e720c1d48c87217452db01808bc8c96))
* remove code unuse ([2fd41f1](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/2fd41f19ca51d1fbbba25bf5460f36b5b5965e6e))
* rename function handlePromotionLogic ([a529299](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/a5292999aa620d64fe6292c183493c946e9bebb5))
* return promotion when get promotion TO Progress ([1abbcc6](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/1abbcc6c4c76ca83b895119adba4b6239e29ddb6))
* return promotion when in game ([27e708e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/27e708e1f6202b2ad4f6adaa2e861a59a3e7766e))
* roll back bonus item ([bfc66cc](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/bfc66cc5741a044515f016b98d99010c6bab9c14))
* sc-game-base@6.0.0-beta.30 ([e0a678b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/e0a678bd18232a393593fe1471ac5a5817a707f5))
* sc-game-base@6.0.0-beta.32 ([99a4321](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/99a432198017a97e705cc67fd738ece6903415bd))
* sc-game-base@6.0.0-beta.33 ([54f01f9](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/54f01f9dc79c53a7794ef99c44c49402a53c78c4))
* sc-game-base@6.0.0-beta.35 ([a25bd47](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/a25bd473d8c5d0090a709fa4c72ddd00d7c52d61))
* sc-game-base@6.0.0-beta.36 ([09024e6](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/09024e63ca99b1e69ef2a9756ee9228512b3d985))
* sc-game-base@6.0.0-beta.38 ([a82054c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/a82054cc9249531461fb00a4d40a0e9d1ab07750))
* sc-game-base@6.0.0-beta.39 ([231a168](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/231a168dfd0acb5c313df5977066ff15bf09189f))
* sc-game-base@6.0.0-beta.41 ([6266de2](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6266de2cc8ca4c2e297c6fbe342db9efdffd79b6))
* sc-game-base@6.0.0-beta.42 ([b7dd7e6](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/b7dd7e615c87de6fd9e8e4e2dea64fd145bdd63d))
* sc-game-base@6.0.0-beta.43 ([dd7d120](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/dd7d120e88ee3cee50045b46f9085195f5578a57))
* sc-game-base@6.0.0-beta.46 ([06797b3](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/06797b34983bc6d7c5e5999aa8855542af5ec2ef))
* sc-game-base@6.0.0-beta.47 ([23349fb](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/23349fb4c6f5ac08d6a096b0789fdab6b66445a6))
* sc-game-base@6.0.0-beta.52 ([a2460b0](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/a2460b06e5e82de1d13ce739e4134887115eceda))
* sc-game-base@6.0.0-beta.56 ([f2c31a8](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f2c31a8fd5b4fbd5a79886a291f460b9cc518c23))
* sc-game-base@6.0.0-beta.59 ([e1fcf8a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/e1fcf8a418c702e48ad52cd7f44e108d2b7852dd))
* sc-game-base@6.0.0-beta.60 ([3ca74f7](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/3ca74f73915c0fb4fe44226c6ead11df14675dc0))
* sc-game-base@6.0.0-beta.68 ([efd992d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/efd992d906b8ae4730ebac8002aa0bbaf548520a))
* sc-game-base@6.0.0-beta.99 ([12e58ad](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/12e58ad9f605174023b63e51182be7f565866e7a))
* up version api client ([69e9199](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/69e9199757d87e8f1fe195691370b4731991c7dd))
* update after success event ([6fe8379](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6fe83797ae57b861e918599ece3d61f9dd533447))
* update callEndGame - add metadata ([49928e6](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/49928e6f51699b62b6f5aa86f88b12934a0a0a6e))
* update free spin extra available ([ecbdd2f](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/ecbdd2f102602c6e10a9b4e1cea6fedb9a8f6d3b))
* update free spin extra available ([15556a7](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/15556a739198f9181a1981d6a7c75a5f6f693dfc))
* update log error fsb consumer ([4f4b569](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/4f4b56997d9d08a733b90e0e78b3c322bcce17e0))
* update promotion client ([f35e6b6](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f35e6b61c2c6840b68d2e4e4f5d9fe24f06a2f27))
* update promotion client api ([25f6126](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/25f6126502ae6d3dfa3199c1401ead3f14ba4b36))
* update Promotion Ticket ([7a23d4a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/7a23d4a504fd658aa87e5fe1b2e637506ff14d0a))
* update sign in end promotion end date ([982d0ac](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/982d0ac0cdefa7aff5ab96f2ccacb54e43cb9c2d))
* update valid bet amount for promotion ([f627662](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f627662af31c5b684f4a5abd3ef071f8d5d53fc6))
* update version game base ([99e3fa1](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/99e3fa14512052bb2bde14318941855ae573c957))
* update version game base ([411cdec](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/411cdecf578917763449ef9bd6f0921a229723f6))
* update version game-promotion-api-client^1.0.1-beta.19 ([8eefe21](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/8eefe21c0268d192858dce49c74988dc8c753a1f))
* update version package ([6a03873](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6a03873af5dd393d3d90db30238ccdc87230945c))
* update version promotion client ([33ea05a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/33ea05a430ce3869e0c4900150bea912f34ba3e7))
* update version sc-game-base ([ef67d25](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/ef67d2555addda883adf2ae02342a27d529d6c33))
* update version sc-game-base ([ac53eba](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/ac53eba27819c8cafc313ddb714b8580b90ebbbf))
* update win amount ([3a93087](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/3a93087647a61cd0462687e52b60aea23f3f4601))
* upgrade libraries to fix CVE issues ([05ef7e7](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/05ef7e73a806e31acb22ad842d75ca07632598c4))
* upgrade sc-game-base@6.0.0-beta.0 ([9c6b0b8](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/9c6b0b85e1f3a3d800626bab1a3e1fa01068aaea))
* use extra free spin promotion ([b34f8cd](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/b34f8cd059f34e895ad45ad3c806eb4c74d1a77c))
* use free spin ingame ([3616f39](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/3616f394876f138eb6fcde94ead242f23508ec1e))
* using PromotionFreeSpinsPublisher for redeemConsumer ([07eb59c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/07eb59cdad1e71ec39f8da90d0b4537b1ade8290))
* validate free spin eligibility ([072028f](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/072028f770a44a248cd512bd23efe56634bce8fa))


### BREAKING CHANGES

* compatible with node 20.x.x

# [2.2.0](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v2.1.1...v2.2.0) (2025-05-19)


### Features

* update bot reset, update schemas - convert player id type to string ([7f324aa](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/7f324aa2b4781683c6054fd5ec704e94424e499f))
* update code for new game base version BREAKING CHANGES: sc-game-base@5.4.0 ([117bc71](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/117bc71e76d315b1166e11e929d7d9f0a4a3f2e1))

## [2.1.1](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v2.1.0...v2.1.1) (2025-03-18)


### Bug Fixes

* remove unnecessary rounding in bet calculations ([e225b48](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/e225b48652f85dbc454026f1cc51dc14a960c167))

# [2.1.0](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v2.0.0...v2.1.0) (2024-08-27)


### Bug Fixes

* add try catch for process expired jackpot ([435e2c1](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/435e2c10bd147c030af5d0a0e6926d6e612681fb))
* bot contribution - ignore validation ([d7d705d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d7d705d96ef575ed39a432c6982f0811f0816218))
* calculate bonus duration after jackpot ([adf0406](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/adf040606ae7f4a8e62ed8603531776ca5cb1a1e))
* check bonus before generating ([ffc7e1a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/ffc7e1a6014d35d129c7e3c79d9112a162b58abc))
* expired time compare ([beac41a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/beac41aba666f6df4f4c527452dc2505c1bfb33b))
* get jackpot pools config ([bf21f6d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/bf21f6da7340c52babccbf251b08c9c2f45c6023))
* ingame - gameconfigs payload build when jackpot is disabled or user cant access jackpot feature ([7a1c9ba](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/7a1c9ba5a3b2a891b85664721c6df14e691de54d))
* jackpot checking ([d080e53](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d080e535a1527cad145872f47bbf7c5bd6c86cc6))
* jackpot error code ([5b2ac5f](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/5b2ac5fc57a27c4699d938aa54ea7ddc42bfdf20))
* jackpot game auto pick - using promise.all ([7d9edd5](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/7d9edd55f7b4a2d0bd7b15bea63bc7a400ee0d78))
* jackpot prizes generator ([b4595fc](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/b4595fc7d1d6bca7c0dfddf7419db7ccb1e3e2d7))
* jackpot settlement checking ([eb3202c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/eb3202cf34f5b16a7829e9ec861b078d3988215d))
* jackpot-game-consumer - isHavingJackpot ([4001db3](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/4001db355307ff354f6c407555d5580afe92fb88))
* jackpot-game-consumer - isHavingJackpot ([9431d8c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/9431d8cf22d7ad9a35837275bde85cb13efa8ec6))
* move jackpot into settlementResult of ingame data ([4b1c054](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/4b1c054348ba893ac60f303bf4dd08c2d90d7997))
* not auto pick jackpot if no existing bet ([3dcfc13](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/3dcfc1323a5bec7f09eca7fecdca0f388c832337))
* place-bet-consumer - validate free spin ([065da4e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/065da4ec96efce34fab9b5941d99c009851eccdb))
* register jackpot-game-consumer ([14e22f6](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/14e22f6345f46a9ee96c3afa123d2a176368eefb))
* remove pool filter from runningPoolFilter ([284152b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/284152b4a28d418978756a147dd4861c2e7453b6))
* remove required pool in jackpot model ([ac58dc7](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/ac58dc7240f94a8f65008fe4eb3e83d56c700c69))
* resetAllBotData - filter group with betLevels >0 ([53a33ea](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/53a33ea1b8452ea5f6718d278474e3617d4327ac))
* return bonus board when player have bonus ([4f0a24e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/4f0a24ee1e825c357494361b464ab6b58da8f0ce))
* return if auto pick but not exist bet ([fbc2a79](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/fbc2a79c5f33764f7ee7177bff90c62c79ad351e))
* store jackpot prizes to ticket ([0b08a0e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/0b08a0ea3fe74026726962266fb4a7cbcd2d48bc))
* update bet contribution ([9e1a6be](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/9e1a6be86d25c83d3bea2aa4774872eba12d3eac))
* update collectRoundSettlementResult with board definition get from generate-result-consumer ([3c8c49b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/3c8c49b0546e4bc8a42b1d79d701aca4ae1408d5))
* update contribution rate of bet ([c8bb092](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c8bb0924c8737968abf0f9575a58a1cedeefcef1))
* update default jackpot prize to 10 and bind jackpot game socket ([864f2ed](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/864f2edacee8d63884e991d2a3b6a4062cf07c38))
* update format jackpot prize generated ([bcb1f99](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/bcb1f99ba44ff3a782daafbd3d9dcd6cff58fbe4))
* update generate result from consumer ([26e8e69](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/26e8e6958618edd7a41a740ae4bc12a5a4ca635e))
* update jackpot contribution ([0c4cbad](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/0c4cbad6736056363220d11a57707156ffaf77e7))
* update jackpot data in betTrack ([e1a2c2f](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/e1a2c2fbcdbdbd4033192cfcb7ace829e1e48d0c))
* update jackpot data in settlement result ([80aca54](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/80aca5442122b62c3a242183cb3e43cfce0eb00b))
* update jackpot filter ([24fd11d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/24fd11da3210bf7b0a169457b032be5ebc41d2cf))
* update jackpot game and add unit tests ([b4e67ea](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/b4e67ea82915832b246bc9061ca4155e2b8a9619))
* update jackpot info in finish event ([033469b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/033469b3719975ac8a7b433c4d74228a6aef3e24))
* update jackpot picked & winning prize filter ([1ebf57b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/1ebf57b9c3c7e744f711469a88c9921367cce090))
* update jackpot pool contribution in ingame ([45a764c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/45a764c9921209c159a74b5bf3158233bab01e12))
* update pool name for jackpots ([f309f8b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f309f8bf4ee2d57e6b2bc7388f9c993ff95e9f3e))
* update settle after processing jackpot ([8cde56f](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/8cde56f9bf1aefc3d6ab9aa65a07dfbfabf02add))
* update settle round when settle jackpot and unit test ([157fe8f](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/157fe8ffaf136f76107074914f7639c7d6151750))
* update settlement after processing jackpot ([836fe78](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/836fe78ccbc30b37e06f2e0a86adaab931351f2d))
* update validation when auto pick jackpot ([3448911](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/3448911327f0b0897024d5d93820e27e9a4a73b1))
* update winning jackpot data ([c9a6b7d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c9a6b7d552a6640f4f214ddb45d4045ead2a078b))
* validate jackpot when auto pick ([762256e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/762256e2351385fb5a563c73f047153026a9a72a))
* win jackpot still contribute to new pool ([cc0b694](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/cc0b69448296dc2d0b14048cdbddd6d0aece5b03))


### Features

* add auto pick jackpot when player out game ([cc20745](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/cc2074558abab1c2de83a5e0c6db37c8beb4d1ae))
* add delaySecondsAfterJackpot ([61a96c0](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/61a96c0ba5c3435dcc7956b4f70dc541f706c2bb))
* add generate-result-consumer ([59f3ff6](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/59f3ff605d75a1a3ab878fc28c3c43d16777ef18))
* add invalidJackpot errorcode SB1940 ([166cbca](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/166cbca33c677def05d7546bd7dd4ff27229b260))
* add jackpot game handler ([243b670](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/243b670dad4989cb4d701a6df1144487e38b5639))
* add jackpot game in settlement flow ([d256066](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d256066408b132ac009b9aa89ee809a254e4fee8))
* add jackpot prize generator ([2f71082](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/2f7108212a578e7b1126aeaf1cf5d028bcb20e1f))
* add jackpot prize weights ([e8e587b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/e8e587bbe9a6bc735f82d6cb2d9704f703478823))
* add new socket route for jackpot game ([4d45d18](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/4d45d1889b2a1c8084f8e2d8f80e999a6eb723a9))
* add openedJackpot error code ([8878428](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/8878428fce470c10858a4bbbe6f5be55637cde7e))
* add prize to jackpot collection ([ded0818](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/ded081848e4063230e73c93a2f2b3c1197b1f0bf))
* bot contribution & jackpot mini game ([2b3d59e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/2b3d59ea55ae0fe7bba0a5c6b296b84754e9dd3e))
* call bet.save in processJackpot ([de64556](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/de64556b48be980051c9b0becb541e5dff26627b))
* centralize generate result logic to consumer ([c0be114](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c0be114c65aea26c4314db953374e70389c386ac))
* contribute bet to all pools with corresponding rate ([ab28b46](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/ab28b464c76ac2f49ca9550166e68de151995883))
* get contribution rate by sum up from all pools ([9d4077d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/9d4077d1754e64a488be8728e481e36f2fc09960))
* hit jackpot by prize ([91979b1](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/91979b12b6003be386aa180b4b1d579a6895c8f0))
* include bet levels to ingame payload ([ecf27bc](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/ecf27bc5c75e2d1380ab5b61334d02f1341df4d1))
* include betLevels in currency group games data ([6f92de1](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6f92de1e1b11e2c3ed52776a1d1aa7fbd58f9eae))
* include prize name in jackpot pools ([a2f10f8](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/a2f10f8a57c109a16d33eaddec122061ce41f2f8))
* ingame returned payload - remove baseBetLevels ([c0100d0](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c0100d080e9c1bf18e712d5e42fb41b1f320a5cd))
* init jackpot pool base on prize configurations ([cd5d0ee](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/cd5d0eec92e8a2bc98dcb7e470e4d2f063c1950f))
* move jackpot validator to jackpot logic, simplify settlement flow ([4701986](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/4701986354c9656416e7ed5f5173e42e578e7fe0))
* new jackpot & bonus flow ([077cbbd](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/077cbbd062dd13580559ed293804372b2ad25800))
* place bet support fixed 25 paylines ([250ecd7](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/250ecd7547c97a98c362fb86c3e3c5c1de0ec8c3))
* process bet queue - calculate contribution rate ([cf707ed](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/cf707edaad25f5d3da1bb670fb3aecb06b9400e0))
* process expired jackpot ([3d23652](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/3d2365231200a24cd7de2a1603dbc0081b6cc074))
* return jackpot prize pool configurations when ingame ([af0f15b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/af0f15b33f8931fbdc75e57601471867f3458185))
* set default player & bot alloc ([4e74ae6](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/4e74ae6e74e4b4175a9023e5eda7f26a86de3aae))
* settle jackpot win for normal case ([945800c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/945800ce970373231d6e5214196d85e3d050aaef))
* update bot contribution ([eaf7318](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/eaf7318f6867b7096c02ecf654d3cfde23dbd7fc))
* update collectJackpotResult ([160affc](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/160affc2bbe756db2861b43b8a7f001ef868cc01))
* update jackpot & bonus durations, add defaultBetLevel ([8f2c117](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/8f2c1171a49e093af145eeee0ada4e53c3489051))
* update jackpot notification ([90d393d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/90d393d4abbb18e2d17dfe1517c0511c3050b755))
* update jackpot result ([70b21ce](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/70b21ce9e0b3c029911fe1ee6298063759314a61))

# [2.0.0](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v1.7.0...v2.0.0) (2023-09-28)


* feat!: use default symbol weight strategy if game configs doesnt have ([a937b9d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/a937b9de1d58c1454b5ef84246dc651d704b10eb))


### Bug Fixes

* expose SlotGameApp ([ab64021](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/ab640218300b43d77dca63171143a5fb5a4a09c5))
* remove sc-instrument-helper since OTEL now support esm ([e3e062e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/e3e062e97a718c905990644f94a57d401204ed65))
* remove unused constructor ([6344a0d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6344a0de7a56e481d7d8cce59affa1688d4ac954))


### Features

* add OTEL to instrument code ([3ff85e0](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/3ff85e07fb0d5905e179e98d782d937dfae1fa9c))
* upgrade game base that support OTEL default ([bf147bf](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/bf147bf1c43cfeea4c7d80c40c2c549b677e1fc8))


### BREAKING CHANGES

* sc-game-base v4 + dynamic symbol weight for strategies

# [1.7.0](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v1.6.1...v1.7.0) (2023-08-21)


### Bug Fixes

* hit jackpot collection update - update current pool then create new pool ([8e81ce5](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/8e81ce5fce65e0cfba452aa267744d4d1180a2c5))
* jackpot consumer - get latest round Id ([54c18cc](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/54c18ccd97df4a008c46176b376ec5468e5b2222))
* settlement - get winningPaylines when user hits jackpot ([e501f8b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/e501f8b17fe679b277f0b6f2187b29331fae2f0c))
* slot history query - enableJackpot check ([c159ce5](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c159ce5308e33341e4da16bfc7499576a9995956))
* update lodash impot ([8afce27](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/8afce2766582c5321f1be0b456a7985475bb9ab2))


### Features

* add new fields to jackpot collection ([b2c8bae](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/b2c8bae38be025955cb686ed43756a5180181dd4))
* jackpot - only accessible to user with disableJackpotGames=false ([fcd55bd](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/fcd55bd4c929ad2a105e44e270df0d9ae9a66c46))
* update ingame consumer - get jackpot pools condition ([ff89656](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/ff89656ec467cfe45d1547416b718e44f0d72269))
* update permission - support multiple currencies ([25944e3](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/25944e3c8bfd5901a7b484769399d2eba4a9dca7))
* update slot history query - add enableJackpot ([643adc8](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/643adc83ebc5d900844e8104e9c4d032205bf912))
* using board strategy from game config ([4d01d39](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/4d01d39215b508b7e23051b217efddc8097cf2b4))

## [1.6.1](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v1.6.0...v1.6.1) (2023-03-15)


### Bug Fixes

* get metrics issue ([f1f5067](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f1f50677015b0c486d9d6d7204c407cf9a93b1f1))

# [1.6.0](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v1.5.1...v1.6.0) (2023-02-24)


### Bug Fixes

* upgrade stable package ([ff0c77f](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/ff0c77f0fde417d3472f3b56394e07f943882d2e))


### Features

* upgrade game base for updating domain ([70ad7f2](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/70ad7f229731672f7270a8addb06d844838ff672))

## [1.5.1](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v1.5.0...v1.5.1) (2022-09-26)


### Bug Fixes

* playing permission ([c4c710a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c4c710ae9a7fe4ae0751f8d0d97062acf1354c18))

# [1.5.0](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v1.4.5...v1.5.0) (2022-09-14)


### Bug Fixes

* create fame ([dfd44e6](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/dfd44e67c49252721ef8f0531df58ccde713479b))


### Features

* update db schemas, remove duplicated fields ([952a25f](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/952a25ffa17d78c89de79c641f1678e6a46752d9))

## [1.4.5](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v1.4.4...v1.4.5) (2022-07-12)


### Bug Fixes

* add player param to generateBetInfo func ([de04071](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/de040719d77354e15581ede1434b7458caba5937))
* change generateBetUnfi to async func ([3206ea9](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/3206ea96cf6e1b8d4c44b4c7078a1f70abab4a56))
* extract generateBetInfo func from proceedBet ([14417c1](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/14417c1c7d02987ef31985199595ba3586a17f65))
* upgrade sc-game-base@3.0.2-beta.1 ([07231cf](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/07231cfa557d8be6cb6caa4b136efba8aa6d64ea))

## [1.4.4](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v1.4.3...v1.4.4) (2022-06-29)


### Bug Fixes

* query history ([d836ef6](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d836ef69955aac5b85c6a1f78cdd8e2236317d0e))

## [1.4.3](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v1.4.2...v1.4.3) (2022-06-28)


### Bug Fixes

* operator token for sc ([d0ea288](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d0ea288d5660e0610274cc2dcd8c58e771e544d4))
* rebase branch ([18b8d8e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/18b8d8e6eb86fb6000c503b1b29b1255f5553f2a))
* release version ([e4a3fce](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/e4a3fceff03932276fbab9bf2e010a6e06edb903))
* remove mainServiceCommunicator ([59d38e6](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/59d38e6ca9b8720a72f6b8d4b0184974f8baa793))
* revert verify session ([6048b87](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6048b87f1ec1526ec34ce29cdd3037f610696cc3))
* separate branch ([436d453](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/436d45335095d38fbed48d9c4c2d592a9176e520))
* unit test ([b7ba7dd](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/b7ba7ddc3d71f1c98ced91c21a365336ad335d19))
* update authenticationHelpers ([12a308c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/12a308c3fdc46bdfedbe364e03059694b728474d))
* update blocking time ([a78d0a6](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/a78d0a6c5b9ce9066f717545588fbb34467236fe))
* update place bet blocking time ([5710a08](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/5710a0842b381a6916d056a17658ea5817fa56f6))
* upgrade sc-game-base@3.0.3-beta.3 ([1270200](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/12702000b30b02c677f69fd13d002535125312e2))
* upgrade sc-game-base@3.0.3-beta.4 ([4ebab59](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/4ebab5947c6a988b152fde6e7d69c695925b2ca4))
* upgrade sc-game-base@3.0.3-beta.4 ([174ef40](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/174ef40a666d1b36bdeaecb7e2ef553681a25796))
* upgrade sc-game-base@3.0.3-beta.4 ([b3847ef](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/b3847efc3854af28cee13674724898131e89b515))

## [1.4.2](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v1.4.1...v1.4.2) (2022-06-07)


### Bug Fixes

* remove unused method ([711cf6a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/711cf6a684777effe6c55b6cd38fe0682dfef532))
* restart game and big win ([8df7e79](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/8df7e794c6bffe2949d1e18559bca7e3c3ac9a78))
* review code ([285ab0d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/285ab0dc4ab3d4315b673123af4d0e156dbb5306))
* upgrade sc-game-base@3.0.0 ([916bc28](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/916bc28f470b1f9c2649a10d264fe760465101c0))
* upgrade sc-game-base@3.0.1 ([c19fbdd](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c19fbddedec1ec7cf6389724c961ada92145f590))

## [1.4.1](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v1.4.0...v1.4.1) (2022-05-16)


### Bug Fixes

* destruct awilix ([2617598](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/261759897220af8d88b8bd69f93551d4fb51dda6))
* get correct stake track for bot ([b42b61d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/b42b61d5ed98f5ad24a6364a64d2fe8631a677b8))
* update default botRatio ([aebc79c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/aebc79c27df4e1a08b9625a228a74fedd3d40580))
* update jackpot possibility for bot ([aefc146](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/aefc146f266c5d205c922bee9b93fca036ffe4f5))

# [1.4.0](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v1.3.0...v1.4.0) (2022-05-05)


### Features

* toggle bonus calculation methods ([2b0530f](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/2b0530fc5d320d848995c52af7cc1c0e17351e43))

# [1.3.0](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v1.2.2...v1.3.0) (2022-05-05)


### Bug Fixes

* operator token ([24171e4](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/24171e4f395783cd77e8c2bbb12c05fdc64b5391))
* rebase master ([0b1b76a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/0b1b76a6d356e4e8bcbdf9234fcd6c26f8d2cbe6))
* upgrade sc-game-base 2.8.1-beta.2 ([3904c60](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/3904c6062d98416813cad3dbb30ef08a62c98e93))
* upgrade sc-game-base 2.9.0 ([170876d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/170876d22a5f8a1053f54452213f4e5bd85f4ea4))


### Features

* upgrade sc-game-base@2.7.2-beta.2 ([c8c4eda](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c8c4eda8499ff21abf16d8f65d5da03f8eb9c359))
* upgrade sc-game-base@2.7.2-beta.3 ([71fd911](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/71fd911bb09baf5c493ed55306d5b89272a874a0))
* upgrade sc-game-base@2.8.1-beta.0 ([b8fc8da](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/b8fc8dad4fe5f2f0edad24f65525fd396722c069))

## [1.2.2](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v1.2.1...v1.2.2) (2022-04-26)


### Bug Fixes

* dynamic bonus calculation ([83fe61f](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/83fe61f05208b0070f954c7a28a321adb6fd4dc1))
* dynamic bonus rate formula base on number of paylines ([0adec11](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/0adec11cb694ebabbbf014587d04f10c7d7ae258))
* floor min-max bonus ([175a17d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/175a17d8606b7b3bc0eb544f243b3767b535ce5d))
* update calculation ([bb32c85](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/bb32c851c9755d85b3f080199e04f11fec291f06))

## [1.2.1](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v1.2.0...v1.2.1) (2022-03-14)


### Bug Fixes

* check user enable jackpot with test currency ([0fc9244](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/0fc9244ee7594c1344f4f613af6320ebb7bb492e))
* review code ([0ee82e1](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/0ee82e1f54860ca15ed156df88691a18556821c3))
* update db schema ([9f898de](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/9f898defe13f2e3b8de758df141be85a57523668))
* upgrade db schema ([fbd2eef](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/fbd2eefc2f4887b0d9f060947473b3824a7a72e6))
* upgrade sc-game-base@2.4.3-beta.6 ([99fe59e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/99fe59e2e622d3f15ac865aceefcdb03cc2f3417))
* upgrade sc-game-base@2.4.3-beta.7 ([a58b01a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/a58b01a0d86c72a6e04f92ace1ba4ff1b6a161ae))
* upgrade sc-game-base@2.6.0 ([21a7a6b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/21a7a6b0e98a1561861f859820b8ee807d736909))

# [1.2.0](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v1.1.0...v1.2.0) (2021-12-28)


### Bug Fixes

* base pool for bot ([f1f44fa](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f1f44fac3f7b0647baed1ee5ad6c43b8bb52eb11))
* big winner - not support scs ([08284b9](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/08284b94987543bfb61ac22fdf98ee7361ddf19b))
* ingame consumer - return rate|multiplier ([ac8bfbf](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/ac8bfbfbf437648f8215e1b7883852f076176d60))
* ingame consumer - return rate|multiplier ([a933188](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/a933188e432300b6e40b5b993fa2fc5bf19772ca))
* jackpot scs configs ([5c66b8b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/5c66b8b4a61551b948c2fac6a80c191077fdc1c2))
* jackpot scs configs ([32352dd](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/32352dd845d8ef5d0896a3b2840fcd1cfa0b0a60))
* jackpot scs configs ([3198ef5](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/3198ef508a95f038f04f6e032a54bec3a9e6c27e))
* jackpot scs configs ([bb3ce04](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/bb3ce0457bb5e772c039b8e6e2c85c405990b783))
* jackpot scs configs - allow 1 currency or test currencies for 1 game ([ba9115b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/ba9115b59e03a22a3e70d7753594ccf1978d88f9))
* load big winners by old viewer rate ([f4fdf7d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f4fdf7df3287b40f56aed6a7590c6e8d65836dbd))
* not get jackpot pool when jackpot is disabled ([8d144fe](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/8d144fe8cb177bba8b0b5116734bbf2861b5c3a5))
* publish base jackpot info ([894b746](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/894b74660c3e075493bc371bf5431693cd66d34b))
* revert big winner rate ([c803578](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c8035780679185d3adf19c72ba5bf601bca3868b))
* sc-game-base.2.2.1 ([17bd9f6](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/17bd9f6418e81e3e58063d067f0b52f690f71040))
* upgrade game-base 2.1.1-beta.13 ([d15a75c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d15a75c6e1659909877ad3d211d4b76644553dd7))


### Features

* upgrade sc-game-base 2.1.1-beta.7 ([88bc82c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/88bc82c8248f4589c7fb204d8d70dcfff452bd4f))

# [1.1.0](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v1.0.7...v1.1.0) (2021-12-07)


### Bug Fixes

* .session.currency to .session.currencyName ([8ab5f7c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/8ab5f7c0a457abd78a7283e2c653b687480316b2))
* add exchangeRateId to round ([b92da76](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/b92da76238d64c95e29d32d8ed4f262168e6ffaa))
* add partner id to rounds ([3b742e8](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/3b742e881196d0ca51ca95e05aa98b258e9a7de3))
* cache stakelevels ([77bb4eb](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/77bb4eb012fa5ae1c5d0d680557f562869683b85))
* cache stakelevels ([aeec70a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/aeec70a40d4abdacec25a6f7deabb5e86a8798d8))
* cache stakeLevels ([7993513](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/799351382f9040388eb8dbde0c6e90c42d31c4cc))
* remove unused code ([6b33d20](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6b33d2045006cac76ee052cf23a4eb83caee995f))
* remove unused code ([1afa8b0](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/1afa8b083b8c485d379c304a5e2f38de7f12de6a))
* revert test session ([90f8c3d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/90f8c3dc68e009f63c05d3e3e6defa26d6623f70))
* sonarqube ([bc27cef](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/bc27cefb3285b790ac932cbf29040fbc27db40e6))
* test session ([bc5ca72](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/bc5ca72f65d79aa955541e45f929ae7181c23e82))
* test session ([c1c9d38](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c1c9d38e7b3204a29623bf984149c859a30f5ef4))
* test session ([0fb37bd](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/0fb37bd57613b1ab9e6c203bda1c0faf60a93953))
* update hall of fame query ([be130db](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/be130db6af210c7d68d3c5ed7c045d4fb4f603b4))
* upgrade game-base ([336f225](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/336f225049bcf8a16e914c76bdc8e07b12e247a5))
* upgrade game-base ([8f4eb77](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/8f4eb776a23da1e265338a13ee276a2115462473))
* upgrade game-base ([9eb70bc](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/9eb70bcbdd792b7a53b86c329a1e669bf9c122e9))
* upgrade game-base - cache currencyGroupGames ([30dbdbb](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/30dbdbbbc6881fa274109b266e2b580f5fedb76f))
* upgrade game-base.22 ([afda772](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/afda772f5c05e20a66abfc500bb1413f9b8b4c8c))
* upgrade game-base.24 ([8d64125](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/8d641251df2437df63d891bda214e2cc2ac0dd14))
* upgrade game-base.25 ([4a3d7f3](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/4a3d7f3cd3137b6d3a088fb231c210e828e9525f))
* upgrade sc-game-base@2.0.1-beta.15 ([ea0db08](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/ea0db08cbc640961dc91438167fcbee913e1c046))
* upgrade sc-game-base@2.0.1-beta.15 ([d1ede39](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d1ede39d3d1c7eaa1d8f775930fe4f82750a1b5c))


### Features

* multiple currency ([995e045](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/995e045a21a9327b0ade6e0cd708806fe02545df))
* multiple currency ([8338d7c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/8338d7cda5938702ed9ec4e704794da6947b08e3))
* multiple currency - upgrade game-base, ingame consumer, hall of fames ([753d60e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/753d60eb7b1a9a6e28c810c46107a38c823b1c0a))
* test type of groupId ([b48916b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/b48916b23a624cf049452f3938aa0f8543a5e1e5))
* test type of groupId ([f9cbef1](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f9cbef1e6db595bb1f8048f456bb03ebc5f82062))
* upgrade game base 2.0.1 ([d2f9a33](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d2f9a33577b4e0b62f58d201fdc573fccef4bd7a))
* upgrade game base 2.0.1-beta.28 ([8f7275f](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/8f7275fa2628986ee832dbbe8f2f9ef84d36747e))
* upgrade game base 2.0.1-beta.30 ([1f4e73c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/1f4e73cdd6a40e82dd49bab86b65dbcec2284b4a))
* upgrade game-base 2.0.1-beta.27 ([52ebdc7](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/52ebdc772d46d188f78382ff612b565d364b06f1))

## [1.0.7](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v1.0.6...v1.0.7) (2021-09-16)


### Bug Fixes

* code smells ([593b567](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/593b5674c026ef1a34ab452b2a95a81c57a37324))
* remove unused gameData in id-counters-consumer ([5e4d7df](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/5e4d7df91c43879cec19ef487981d1aa43c907d8))
* update latest sc-game-base ([455e408](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/455e408349eaadd97045cf5916331a2582f5d2f3))
* update latest sc-game-base ([6a0ec2c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6a0ec2c54e17afd0fe78f0a3396052aff49c3708))
* update latest sc-game-base ([7a5e934](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/7a5e934bb102391b765135c264a43cefd28a973e))
* update latest sc-game-base ([3751285](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/375128527171e6f7b483ec5f43f5ea4919972139))
* update latest sc-game-base ([cfed7b3](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/cfed7b3ce84343d7bb51834a62ec01bdd90f3c52))

## [1.0.6](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v1.0.5...v1.0.6) (2021-08-03)


### Bug Fixes

* include gameId to filter when delete free spin notifications ([d8fae15](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d8fae15739f0228f9df87e6411e33ab44d024b40))

## [1.0.5](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v1.0.4...v1.0.5) (2021-06-30)


### Bug Fixes

* add errorCode to notice ([2116168](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/21161684ebce995732939ec1385483c263026144))

## [1.0.4](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v1.0.3...v1.0.4) (2021-06-10)


### Bug Fixes

* expose query opening bonus ([2c519cd](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/2c519cdd5c383307f60e8c3c1e7901f44465a945))
* format error ([957a982](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/957a9826c9ed5ad000d811ec323dd1149d2a91e6))
* inject notification in game cron ([d87ba9a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d87ba9a5fd11e1c4b6201d70b22c987fb057f632))
* inject validateBalance api ([b080807](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/b080807a3f5a77e7464be3b9274042f6831e61fe))
* not validate betting time when dequeue bet ([03d8ff4](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/03d8ff49073e77ec65136dd423958d33d53b774a))
* update bonus error code ([371ea97](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/371ea97875c2bf515ed692cb128615398d8f5727))
* update error codes ([27e8687](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/27e8687327f71320efc4bb4def1869644aa1f373))
* update freespin error code ([d7ec613](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d7ec613647d7434c2497975eb8ccac245810c29c))
* validate bonus chest ([48a6fd9](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/48a6fd97d78b69b9a2a572dec36d91c318a90a3a))

## [1.0.3](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v1.0.2...v1.0.3) (2021-05-19)


### Bug Fixes

* add $set for idcounter ([6922317](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/692231747df7593eccd5fba748b9f02c94d0202d))
* add log when init new jackpot pool ([248eb48](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/248eb484893a93b1af36a8d2053a69d4d7223f48))
* alert if jackpot pool greater than 1 ([6a0a839](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6a0a839e60d9fe7a53442999e16de6ce0c3e714c))
* correct freeSpin id ([17c38a5](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/17c38a538ac51ca9add953c7ec806041f21a0a63))
* correct freeSpinId ([0c88c73](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/0c88c73248cc1dbcf4f48811e9961db0cd46eac0))
* correct name of archive status ([81869da](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/81869da8b2478d8f69605ca78f121c36499c8f5b))
* correct round and freespins value ([6e2b3b9](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6e2b3b976ff970df4b1bd82dfde2c7e04ccffaac))
* get latest round from jackpot if it greater than archive ([88939f9](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/88939f9f4c2bf4db189b47c3ee48b99b6a20edfa))
* get latest round from jackpot if it greater than archive ([94d88df](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/94d88df9c83c37a5ff6b765a7884da878a8178f2))
* implement archive status for round and freespin ([91b81e8](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/91b81e838496c3eacefc16eee34e95ec6cb1a2b6))
* increase round and free spin id ([5d0f8ee](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/5d0f8ee2e55ba9d98461013e94d5b7dc201d0e54))
* only get round from jackpot if enabled ([39dcbb7](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/39dcbb75fb9e204b72f9cdd87bb082e570f98e0c))
* only init jackpot if enabled ([c222d3a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c222d3a83b7b9e5008b125bea9ae0f938ac3050b))
* update id_counter if get from archive, update log service ([9897371](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/9897371f20ad92c63d3f29c965548afccccb0927))
* update id-counters model ([9824780](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/9824780c494f5af48a7d9164ca182268d965d6da))
* update init value of round and freespin ([f8153b7](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f8153b7282c353edc945dde9679bbf92f59413ca))
* update latest id counter ([dbbbbd9](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/dbbbbd90c37b0e2e9154dbceb41464d8eb1c6135))
* update round and free-spins model after removing mongoose plugin ([bc2672a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/bc2672afe674c236f8dec9a2e848736ef4c1df04))
* upgrade sc-game-base ([8d2dcb6](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/8d2dcb6127d973d82de1762d0941f6b64f0212e5))

## [1.0.2](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v1.0.1...v1.0.2) (2021-04-08)


### Bug Fixes

* avoid bot hit jackpot if it was disabled ([9ba3677](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/9ba3677bc54f2d7f243efc4ac1c48f6ccc9989fa))

## [1.0.1](https://git3.nexdev.net/sc-packages/sc-slot-game-base/compare/v1.0.0...v1.0.1) (2021-03-29)


### Bug Fixes

* adjust filling strategy for easy ([bcf7118](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/bcf71185b64f5abb9cbda8393a2072196eeac5a2))
* adjust filling strategy for easy and medium ([9ab7589](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/9ab758905c2c2bcaa304cdf9e3844d6f7b174525))
* change filling strategies to adjust payout ratios according to difficulty ([995761f](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/995761f79e391d06abd48dc4828c1aa229d1a4d5))
* correct slot difficulties ([4c74645](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/4c74645cb726571ac9aec5240827dcc8b3fcc0de))
* update code to test board ([51eff72](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/51eff72a93b0f83fcbed06821de030a201fc649c))

# 1.0.0 (2021-03-17)


### Bug Fixes

* add await for bonus router ([9b9fd67](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/9b9fd678da8734a43e84cff2b718de0155e5a910))
* add bonus consumer to socket router, index for consumers ([4b080af](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/4b080afd5454f300a59dba772acfe05ff108de98))
* add bonus expiration time to definition ([abeb3bd](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/abeb3bd3957d69212f46f61601accce00c947264))
* add bonus size to definition, store bonus chests to ingame ([3fec98f](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/3fec98f21a3858195660777a8268b1c44f2610e3))
* add condition paid when query bet to settle ([1b0062a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/1b0062aa530184d0167fd2504c2b639d07db4fd2))
* add contribution params to place bet ([79077fe](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/79077febe1d6f3b8393140053042d95d91036bbd))
* add default for free spins and bonus live seconds ([5ed6c7d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/5ed6c7dac98d5e6e2eb6a98692a22afc2dea04f9))
* add default JackpotPubliser in JackpotConsumer ([bb7091a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/bb7091aa83e837188e2a5b54cd04b4314afbafe8))
* add endTime to round, update settle constructor ([f5c2939](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f5c2939b1eadfa7cd17f143faf960f3e4d188f63))
* add freeSpin into round schema ([c543ba9](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c543ba9776c967939f443d4a2578dd17ad2be0b6))
* add game notification for free spins ([6682689](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6682689b49122a0b83ad833d2f6465f3879c959c))
* add gameId into Jackpots model, rename game to gameName ([9a51c68](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/9a51c68a2adb401dc64daf8ae0f2127edeae47d3))
* add index for board and correct imports ([2a04bbd](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/2a04bbd79239a33444633fee6885ff113e2f3cb7))
* add index for publishers, query-apis and routers ([25802f3](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/25802f3ef51421e9aea0ad9077b80cf24eac0c58))
* add log for proceed bet ([9360e24](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/9360e240a0974efa42cecbcee50ddd2d3b135094))
* add log in dequeue bets ([2664691](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/2664691a6502af0334cffda2950f5fc6e7e62161))
* add log in proceedBet for tracing issue ([d6047e8](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d6047e8a243bcc6b7aded4bf0af40ffdbe8bfb21))
* add log upsert bet ([327c1fc](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/327c1fc876e54de34870772edb034be05fe57f30))
* add logs for after proceedBet ([c594bbd](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c594bbde38417953d78867c09fbf6fe37396f893))
* add logs for set board api ([a94c9cb](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/a94c9cbb65e79ecbbbe8fe5476131a3b943ef706))
* add logs for specific user to trace issue ([264e64e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/264e64e332228acf4eb3a62d696ef9cf315eb98b))
* add logs to compare 2 object ([e9c6ef2](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/e9c6ef28e4c63b03ab436ecee8ffea8b0aa1c536))
* add logs to trace blocking bet issues ([440a691](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/440a6913de558c9f797defe5c679ebc30647fefd))
* add missing initiation of http-router ([21ab9d7](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/21ab9d7f41e97ffb11210148b8f1200c86be53f3))
* add missing params' description ([7e135a9](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/7e135a9eefe90021220a03d9f482e7c23e26d10e))
* add more filter when query bets ([6d8659e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6d8659ee95bbc1cd23d1cc0d0ec0c06922caa7da))
* add more log for tracing case user stuck at place bet ([db66816](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/db668162690814d37658b21ed4376ab17450b963))
* add more logs for blocking bet issues ([f713a42](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f713a427715818e9b19be002e9113f27eef0a7b2))
* add more logs in place bet ([d4810c3](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d4810c3353efdd23f12c94440a51faf4588de484))
* add totalAmount to bet ([30f8ed2](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/30f8ed2bd61a7fb671153bd89e0a64173d6a6caf))
* add uid into round schema, only store winning lines in settlement ([370cadc](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/370cadc0da703ae690dbf081175792f5ccdf7483))
* add winning lines when win > 0 ([94e13f4](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/94e13f45937dda071be2b3a482a02ef92dc1f9e5))
* assign freeSpin to consistent value ([06603fb](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/06603fb2e18821781f8e96693a36ed4e1b6d5e14))
* call auto settle in bonus consumer ([9d00c6a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/9d00c6a579aabd068f5a0c6dc99ef234f12394f4))
* call jackpot hit api and exclude jackpot win ([d07cf67](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d07cf6791a936c200ce3225bf3b7f90f3895c828))
* change model.update to model.updateOne ([6dcf04e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6dcf04eb629b56598ab5f8cbcee92bdb8f3962e3))
* change registry of placeBetPublisher to Core.PlaceBetPublisher ([51542ac](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/51542aca876cc960a3752d0d738081595a4d5974))
* change to calculate on winning lines instead of paylines ([fe0b407](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/fe0b4075085edbd034c9c8847c568b8687af7bda))
* change to use roundRepository instead of betRepository ([d08e7cc](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d08e7cc7cd26ac18e802a605f428309065d0cffe))
* change to user signin consumer of table game ([cfa5ad3](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/cfa5ad3f96aae7c78992e82bf0d37c420b436c74))
* check enabled before run bot ([fca9769](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/fca97694bbe2b98a556b4c68e69dec463b43f0cc))
* check if model IdCounter exists or not before initializing it ([363ab8c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/363ab8c9f2784f46c50840564a0c56cb298d3684))
* check settlement result when process expired bonus ([384b18a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/384b18a6f54469ab66778356136c64c00cb99d6b))
* code smells ([4e37594](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/4e3759477b48de6b5bd0cbedbd4057dc0917a062))
* collect all parameters of slot-game-cron's constructor into one object ([f77c24e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f77c24ef6017281ec2d5d87269aaf728b470407c))
* configure default historyPageSize to 10 ([dc806b3](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/dc806b3b4e0d544984871c5b747bb1186aa9871e))
* correct check picked bonus to settle ([cfb2712](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/cfb27120f616115ecf749823dca20dedaa8642ca))
* correct clean up game notifications ([aecad93](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/aecad93c2caf8d92abd3dd817dbf691465af52c2))
* correct data of hitAt and createdAt in Jackpot model ([0674ae2](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/0674ae2ea07cfa55354f4439cafb26e10380cc88))
* correct data of hitAt and createdAt in Jackpot model, correct comments ([dfe06ac](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/dfe06acaaa197b23cde67a8392766ca190e24ddc))
* correct event-consumers and event-publishers name ([6592d96](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6592d96449f4f01727e001f24a2d687e1cb7c011))
* correct exports ([a22e62c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/a22e62c499048070198808fbfedfa87c6938111a))
* correct field name ([d5d3b44](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d5d3b444d1c75c78744fe61e1e52c81ba52da021))
* correct filter conditions when contributing to jackpot pools ([9366a23](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/9366a23129e1cc9edd6964b153ebeebeb017ead9))
* correct free spin consumer ([7e841ce](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/7e841ceb9a836770a655d215000bdb4be8b2f846))
* correct free spin consumer in-game-consumer ([02f79b5](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/02f79b56e6b31548731765e043fa46d028883cee))
* correct free-spins-consumer ([2d4ce9a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/2d4ce9a916d0abab16779db9a5960b575461472f))
* correct history data projection ([17eaeb8](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/17eaeb849703b03096442083d0ebc4e11eda01cc))
* correct hitting jackpot flow ([c3ce8dc](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c3ce8dc6d481656fd062ad5eb3758ce3ac63be2d))
* correct id-counters-consumer ([fa02a16](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/fa02a16d33bfabee4f62d7197e1a7f91172d6f0c))
* correct imports ([d1dda75](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d1dda75f7b81172b2360c0a026198f9cc8b62186))
* correct imports ([4967dc8](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/4967dc84c2b3008e5a7536665954eec47f2a471f))
* correct injection name of freeSpinsConsumer ([4f1b5ec](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/4f1b5eced4f9d1f6d28160a76ab426b01f915bf5))
* correct injection name of settleGameRoundConsumer ([3d6587b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/3d6587b379cdc888f171f52ce735c572b718230c))
* correct injection name of settleGameRoundConsumer ([cf4ff2f](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/cf4ff2fc3801ebe1c332126082f93a74ffee7cac))
* correct jackpot payline ([7d1b2a3](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/7d1b2a367083f83d0a80f69aa167cf43534c15ab))
* correct jackpot winning amount field name ([a58a597](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/a58a597c696a72e44b5be75e51f4eb3a490f085a))
* correct jackpot winningRatio field name in jackpot-consumer ([aaefe30](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/aaefe30d096dc19b05eed405eaec0f1133fb889d))
* correct jackpot-publisher ([ccc53e1](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/ccc53e1ea3842b9f60bad1ea0c7e696f664580ac))
* correct jackpotWin ([a40c917](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/a40c917838472dd9294e669cc37e26113ac12ec3))
* correct logs ([4d7eec6](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/4d7eec61df5e72892e73b94c53ee4a280a5d5718))
* correct method name ([d3edc49](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d3edc49ed51da7afb71f2b2209fba023f008fc04))
* correct netwin and paylines in settlement results ([f97c13f](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f97c13f2d6f0273dcb88c1f0e790843d75260a18))
* correct parameter name in jackpot request send to main server ([614586b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/614586b1fe7e9886ce545622d5566ea9ed7edcee))
* correct place bet, bonus error notice ([e183a56](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/e183a56792aef5b9cd97771defac305a2a549eaf))
* correct process free spins ([630d420](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/630d42047a8b0a39f0b188eb7ec592a17dde56b3))
* correct queryJackpotWinners ([dea591b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/dea591b40d77354fd57e50c9f21e7c6b3c0a2bf3))
* correct reseting bots flow ([509f6fb](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/509f6fbae17b126cbac19edc04e8948c74a4e727))
* correct result parameter name ([bd4336c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/bd4336c77da540a689529f80786d465075dfc0ab))
* correct results and paylines in settlement ([bad262d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/bad262d061f44a6f870134640ba65855e5e48580))
* correct running jackpot fool filter in jackpot-consumer's hit ([f4e6ae8](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f4e6ae89b11306939de7c76cb63b280748cb251d))
* correct running pools filters ([14c9984](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/14c9984e6a5fadad5af38d3e39cdacfb1416ddd3))
* correct stake levels check ([1ca6685](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/1ca66855f4147c196d320e6539cf6ee2398091c2))
* correct the finish data when settling ([8e47cee](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/8e47ceeb7029f12e29115c169ea9235e1ae85d37))
* correct the Jackpots import in the in-game-consumer ([14ee024](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/14ee024b44b5f99efc56729bfca2b86e2a86ad97))
* correct the loading free spins flow in free-spins-consumer ([3918914](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/3918914195ed40a0086c3abd6e40e0ae2f78ab7a))
* correct userInfosRepository reference in slot-game-bot ([af66289](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/af662891134fe517317e3e7d5efc31a3418570a1))
* correct using namespaces ([dc160fa](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/dc160fa9ad82cb875101cfe427e0d58ea56afb68))
* correct uus check, send bonus result to client ([d5baceb](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d5baceb8ed0c6f0c724dadf01118a64be4ef789f))
* correct winning lines return ([7e78251](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/7e78251e3d96713b49a6d51bc35cf02331a6a39f))
* delete game notification when outing game if there is no free spin left ([e251dba](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/e251dba8b440c53e596fc97abd0b3cddeffd2203))
* exclude bot which already in room ([f9ab3b3](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f9ab3b3b85d03110b4a77b9085ce6a0321faa66b))
* exclude uus contribute jackpot, update map ingame data when restart ([f9294a0](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f9294a094a58936824f75f4440a7238a4d9b06e5))
* exclude uus user from jackpot ([6cdad73](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6cdad733e0e721e9491f860785cf2d0cbcd7db83))
* export models ([5ffa373](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/5ffa373e0850cc31905cc0c8d47715ad82efb4d2))
* export round schema ([82dfbfd](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/82dfbfd72275685b5d9e9005c374551764b1b120))
* export slot-container-register ([a4e10e3](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/a4e10e33d17b60bf0e46378aa4da66bbe2e51204))
* filter winning lines before calculate result ([deda030](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/deda0304b1e1db75295c3c293e9998ec4a96e629))
* find one bet when settlement ([47ba2cf](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/47ba2cf10d26a934c2f0b7b35d8e92aced78f6b6))
* findOne bet when settle round ([0cda874](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/0cda874ebf0f24f7133fe6675201b7d481f4d6a1))
* fix floating point for bonus, contribution and total bet amount ([c39e7fd](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c39e7fdc472ed28b6662c09baf7cb2c04b26db70))
* fix SonarQube codesmells ([099926c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/099926cb9dee47fb439f570e3746edd18c43d18b))
* fix SonarQube warnings ([334def2](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/334def25b68ff75d7304bd1c76939b8c0b15820c))
* get latest round id from game config disabled round ([f529654](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f529654e8e98593c8c2714cd5f1a49f6274796a1))
* get number of bonus from finish ([3112598](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/31125982847be4bb43cb8fcb73413a0a55802a5b))
* get picked bonus from undefined ([a59bb5e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/a59bb5e13f756f39aaec143266c92b324a3b1e29))
* handle board sent from admin, use board-cheating-consumer in settle ([9d4aaff](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/9d4aafffe5b61a5cdf288cf1fa58ec34e8e82e04))
* idcounter may be missing in case the first start of the game ([c25b78a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c25b78af074f3974345006503e30ea1fe3c52214))
* import cron ([c97095d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c97095db7da63899a5a4bb5f29ff1ce0bd4aeb2d))
* import free-spins-consumer to bet queue ([7649386](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/76493862bb242dd23688fdbe0fc5221cb78e795e))
* import logger in cron ([59e027d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/59e027d5d894d3c1b19ab1c86e283b598913b739))
* include bonus to bigwin ([d90337c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d90337cea9d7375540faa7d6c33e73f486ef8a64))
* include round id in auto settle ([68a236e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/68a236e4106ab2e1a61497d516159a2a55f52d04))
* increase roundId before bots place bets ([935a9a0](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/935a9a0dd6fb7ba15bf70f38bf4a7c1c14be5c5e))
* init betQueue when process remaining bonus ([05a5f2e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/05a5f2e009f8487c85bab3302a5c1bc40186043f))
* init betqueue when reload freespins ([5ee7eca](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/5ee7eca4465c411ad5c9cc6f90be33a6033d4479))
* init crons, game data, definition and startup ([0c86926](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/0c86926414613f7af03aa6c8ea05ed84317f7203))
* init place-bet-consumer in router, correct validate bet and jackpot contribute ([294bce2](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/294bce275bfde28bef5794079818c7abc337243b))
* inject userInfosRepository in slot-process-bet-queue ([4759e1e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/4759e1ea69c917a4fa101e7c522fe210d44ac95b))
* make SlotContainerRegistry extend from TableContainerRegistry ([b851003](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/b85100311d527402874855a1b5d55e2b40039947))
* make sure SlotContainerRegistry extends Core's ContainerRegistry ([038e7fd](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/038e7fd807c59f6330c8cf61ec21e550940df362))
* make sure the realPlayer exists when handling out-game ([0b8154a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/0b8154aa409f6b9f8f70603df5fc116ff26ff23b))
* map roundid in free spin ([8848cd5](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/8848cd5992fa8b85b81d60e77dc6e8f70d143712))
* move process expired bonus to bonus-consumer ([ce4a345](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/ce4a34509dcfdd126255aeff9895df65b3335d0c))
* not allow place bet when bet choice is empty ([129baff](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/129baff0d4faa71c9aabc042f61c5c2ff8699d56))
* not contribute jackpot if free spin ([9e11095](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/9e110956dcea384c17af5ae7dbc81c39723af7f3))
* not delete settlement paylines ([f4b4145](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f4b41454a1b3d379972f56594283515c479faab9))
* not process jackpot if config was disabled ([6eb5d33](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6eb5d335f4d6cd1d0544b85d146a5d8822d5b726))
* only projecting necessary fields when loading unsettled bets ([a87237b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/a87237bfb4e4bcc16409944e6b226e9bac78c84e))
* only upsert bets after deducing free spins successfully ([b6aedeb](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/b6aedeb159ccf44af5b54ece1afaaad6e32b5483))
* override adjust bet track to empty ([f6881b5](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f6881b584d7604c50596336fe22b3678610ed7db))
* pass userInfosRepository to BaseBot's constructor ([aee30e8](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/aee30e83ee94b57632ec5ba39d0a1e948430e63d))
* payline-calculator returns jackpot winning payline instead of true/false ([5b19aa3](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/5b19aa3a0c09e2ff32dd9a942172f46fe174c129))
* prioritize process free spins ([a9c73d7](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/a9c73d73acd86be70b194d2088b021e80588b38d))
* process expired bonus ([36fadca](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/36fadcaddbe9c4356e3ca2897f6e87be1ac86254))
* process expired bonus per second ([7a746c3](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/7a746c343557ff9750d604c98a1cbc88d5a4f212))
* process expired bonus when game is disabled ([2b11e7c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/2b11e7cebd77b8b43b766ee39bb025c953b1872d))
* remove all debug logs ([a4dd30e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/a4dd30e99d3daa60f1c07ca420ce64df3104b583))
* remove definition when init payline calculator ([6e2b73f](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6e2b73fc7d1d46e5eb76b15cebc98075d6126dbe))
* remove id in round schema ([86f28ba](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/86f28ba7fc7a991b3d7fa3929bdfeffa2bf3b821))
* remove log upsert bet for tracing ([d5e44bb](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d5e44bb1c5453a13a6d3632dee981e21923513b2))
* remove unnecessary check ([e2c28e8](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/e2c28e88620e3d0d06eeb4f31e820a87481fdb4e))
* remove unnecessary parameters in slot-game-definition ([d3629a4](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d3629a43af934532118cd554705ed829f8650831))
* rename betwin as betWin ([be0b8b2](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/be0b8b267c403c1276bce184e985f07a51f07fd2))
* rename results in round schema into result ([243b626](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/243b62677df0699c93f8fddce7d3e0bb48d08887))
* rename results in round schema into result (cont) ([3d1f642](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/3d1f6422c0e72d2040b993a980e7e473b30f5f2b))
* rename thanhtoan to paid, add endTime to round schema ([52f149b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/52f149bb4aa14ed10fd631b6d9537a5ed307a8da))
* resolve SonarQube warnings ([6e8741c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6e8741c0976945b7c5cc52bf90c95410fe085428))
* return bet's freeSpin flag in hall-of-fame ([698660b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/698660b8e45440d8a304ffaa60309d791e0e9c7b))
* return bonus and free-spin symbols in finish message ([cf15f83](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/cf15f83be001d0dc73e91ebf282f3c3a161cafb3))
* return bonus and free-spin symbols in finish message (cont') ([84e4769](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/84e4769485a4ce7500e6914aaa9e6e5cefee56fe))
* return bonus winning amount in history ([e3ff919](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/e3ff919d743fdc9767ecdb7cd5b046e001052c41))
* return endbet as total amount ([350046f](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/350046f39b6b0823e8b6f80a57b3d5b844820ed4))
* return flag to indicate if a bet is placed by freeSpin in finish ([74a25c9](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/74a25c9721375eca07da8336f5cccd35840c063a))
* return free bet notice if invalid free spin ([68de8e5](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/68de8e544d2a89bec75910d81b65c67256570a4b))
* return free spin bet and paylines ([0b0a1b5](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/0b0a1b5151cb56fc97b51222ad085a58da85b75b))
* return free spin bet and paylines when ingame ([11eba72](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/11eba72c198f5b72803b2eb0cbbe1e6074a962cc))
* return jackpot payline's symbols positions in finish ([8a6f2f2](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/8a6f2f2e597627801ec294f3cf5cb2846e9f6b6d))
* return jackpot symbol in finish once hitting jackpot ([de2a4cc](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/de2a4cc9242f23b13da7f5a580002cfcbae1f003))
* return jackpot winning ratio when in-game ([d6be887](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d6be887369d11f75c2515c5dd93077a855ef5409))
* return settlement resutl to user ([190ab36](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/190ab366af91bd475241ebb76b83282133115724))
* save null for jackpot ([221cebd](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/221cebdd3c3e79e43fcae677f61c842e3896739e))
* send auto open bonus info, separate auto settlement, update settle publisher ([46b90fe](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/46b90fef4d31f840e6366cf11a472c2da3a39de9))
* send gameId in jackpotWinner message to the game lobby, instead of gamename ([caba65d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/caba65d696c4eda377cb69481c8081ea186f74d7))
* send playerId when publishing jackpot winner ([d871843](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d8718433df184e5838a0729ac0085853c895b9e5))
* send total amount to api instead of amount ([b57be56](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/b57be565260d833c29886290c3369903cc2fc0c1))
* send winningLines to client, not store bet tracks to ingame ([a46e456](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/a46e456d0614c3ff927fb75b9bc2abc451203f5c))
* sending jackpot pools when in-game ([af5375e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/af5375e52be6e13cfd9e24650b86c87e33204ebc))
* separate get and use free spin when place bet ([59e517a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/59e517abdf0ee2705174bcff6fa065607946a2d9))
* separate jackpot error ([7f3e104](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/7f3e104731e5aff3c7c202b37851f3478910bd9f))
* set default roundID to 0 when first time starting game ([defa18a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/defa18a740b89457a701ca8c279c4367ba941a22))
* set default value for freeSpin in place-bet-consumer ([7d1a0ba](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/7d1a0ba6cdff1a030bb43082c0c5e1fe534383ea))
* settle after bet succeed ([6fd6c30](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6fd6c305f28bd7f088935900a5c9ec51ff4263f8))
* settle when finished picking bonus ([4dbf09a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/4dbf09ad5cdbccf78225c14d27bc0eb3857528c2))
* simplify reduce expression ([d24d327](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d24d3274d911086c2326719a10cad23b4bbc82c9))
* stakeLevels in slotConfigs may be undefined ([781df7d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/781df7d3cdd6114c7b1df673d91b2a9f60bcf44d))
* store jackpot payline and amount to settlement result ([1dcb48e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/1dcb48e37adffa11610f0714c64b16158a1cb88b))
* store odds into round ([5d0fc71](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/5d0fc71980ab5880bd84737f5d07cae856d07bf2))
* store winningRatio once hitting jackpot ([a96cec3](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/a96cec3e86faf4541122a91338da256bcb9f6aab))
* symbols in the ignoringOddsSymbols must be the strings ([d2ab2b4](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d2ab2b45ad9064510bb691172d1f9ce0b2f067d4))
* unpick bonus ([c63747b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c63747b707923228084b033cffc8f41154aea2b2))
* update auto open bonus and test file ([d81c4ec](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d81c4ec47d73b2e760626fded158560d6705f440))
* update bet queue ([6c6e10e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6c6e10e69fa30039700e39953c0473a3f87d2487))
* update bet queue to reuse base, log info in set board api ([62fc345](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/62fc3454cc071c32399d1931a5d8778c8f1cec2f))
* update bonus and settlement ([ec51df2](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/ec51df28a2071714f4e6cb645f15931c5c213269))
* update bonus-consumer, override handle out game in socket ([d37ebe6](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d37ebe620be9047469d56d8678a95773711a1857))
* update condition check uus ([40386e0](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/40386e0af3196db5fd3f179b3aec63590f76c513))
* update constructor of ingame ([f3d1a92](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f3d1a92c2dcc96c5d56af320aa6b874b04d70391))
* update destruct free spins ([aba9c01](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/aba9c0132ec8d87a673afabad0bfb490a2da4478))
* update destruct ingame in bonus-consumer ([842b17c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/842b17c23d3869259ab41f961079a9d3759cd8f0))
* update difficulties value ([0f246c7](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/0f246c743c854ca211b6c84d2ef57ecfcc916ef2))
* update free spin ([aa24c53](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/aa24c53723d66d533d481b0c40ac18fec257ad76))
* update game bot ([547c104](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/547c104e5c9942200da150181d354fe75746481d))
* update init free spin consumer ([0fcf68a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/0fcf68af86e7bd4414f47ad9c09d68a9a9521c0e))
* update init settle consumer in bonus ([c8ede88](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c8ede88df03a9855ff3dea9173f1fce33ca5172d))
* update jackpot hit, check bigWin ([fede73d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/fede73d1c9336d9bd8cfb55a405c83afcad37e56))
* update place-bet-consumer to allow stake 0.1 ([b854a3a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/b854a3a918fb621ade9bcb72ab0caabf60c7b95d))
* update process bonus ([ce8c11a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/ce8c11a7c5ca056820ddd8486b3a99ff0ffb4259))
* update process expired bonus ([84cc3df](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/84cc3df65090545dc1abefb1c4cd07860e81ebfa))
* update round schema, correct jackpot amount ([6beebfe](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6beebfe379bca1f330d3dd65392eb0dbdf9697e7))
* update sc-game-base package ([1d3da95](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/1d3da9543b4f9fbb02e54156ca59de54c2deb127))
* update settle bonus and free spins ([fa855ef](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/fa855efdf9683bcb9d2d7bb2b2b477bb69731a72))
* update settle round ([d628aac](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d628aac16b798ac525546cbc7739f1bbec2f6c3e))
* update total amount for freeSpin, validate bet ([a1398d5](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/a1398d5aa6d2f0f7bc137c9228d1b907d6934de5))
* update use free spins in bet queue ([45f2e68](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/45f2e68f2d81793eda2ea190bd29093d97c58966))
* update validate bonus ([cdec9f2](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/cdec9f2ee7c19a874d9aafbffba07101f2e920f6))
* upgrade new base-bot, remove duplicates with base-bot ([dc3ee1c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/dc3ee1ca98f23a196e421da38746247cbcc93ea8))
* upgrade sc-base-apis and sc-game-base packages ([51b9a46](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/51b9a4653445c663d1ffc07c82548f3604b0982d))
* upgrade sc-base-database and sc-game-base packages ([d1952df](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d1952df23b6f487d0b410b6ccff2573c7eb03834))
* upgrade sc-game-base ([0746b4e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/0746b4e15171ca8814c1d637cc922b7a510343e1))
* upgrade sc-game-base package ([68d9c7b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/68d9c7b9954e0a08a08d239540954b4fdf7d88f9))
* upgrade sc-game-base package ([82efacb](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/82efacb6391c809584f7b9b1ff080a09532584a4))
* upgrade sc-game-base package ([a4806f2](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/a4806f25c7becb070fb90e7951dbf7bb7d583876))
* upgrade sc-game-base, init cron, bot and app ([4a8edd6](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/4a8edd6e5e1d9ac24d26ecfdef7691979e9f2081))
* use free spin consumer in settlement ([d87cdb8](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d87cdb88bd12af74a922040394f57a48631d9d9d))
* validate bonus chest ([f0c24dd](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f0c24ddce3a12aca35926fc755bdfc8d6cb4d6ae))
* validate bonus undefined ([28a529a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/28a529ae94aaa4716a05cbf5dff3d03422e5bd96))
* validate stake levels from game configs, remove unused params for definition ([6e80601](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6e806011c5302382b3e5f56b543195635d01a04c))
* validate total picked bonus chests ([43a4962](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/43a4962b45277d259e4bc14fece3ce8870f0895c))
* validate unique paylines, reject bet if another processing ([bcab5a5](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/bcab5a55419173643cf387d37b9f8f4eda014d35))
* verify ingame finish before auto settlement ([377da62](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/377da62f5cfa83803c9e7c0f19f9e51fe6716fa3))
* verify jackpot object before sending finish ([402d2ca](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/402d2ca4bfa255a2ad0f78d337d3fe3f8ab0df6c))
* writing logs when sending jackpot winners to main-game ([c7cc57b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c7cc57b1a4c1e187aff9a56f1363c3bcc59b062a))


### Features

* add board-cheating-consumer ([151407c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/151407c1e4597f8534ca08a07cda56ccb6b1513f))
* add demo code ([dc54d0e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/dc54d0e771216986dec5aa00466ef5c776f75ed7))
* add demo code (cont) ([7d18097](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/7d18097bf55df5271c0f825e50ac650c17c152de))
* add free-spins-consumer ([3e6bfa7](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/3e6bfa7b57e007f8e18a2c2356a3c12a2dbdc1a5))
* add FreeSpins model ([d5d8f3a](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d5d8f3a68ff998ca1e8264712440ef09377febd4))
* add game cron ([b1e40b6](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/b1e40b63d80e9419961c8cbc2d7dd66f9013d0d8))
* add getFreeSpin into free-spins-consumer ([7d914c3](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/7d914c3e4d4c4240c9a16cfca7d159031620c1e7))
* add hall-of-fame-consumer ([6f4023f](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6f4023fb3cff0865eede8bc568b2d283c3b538db))
* add hall-of-fame-query ([97bf9d5](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/97bf9d5d8bfcd06e6cfc8f58a279b1d5e672216b))
* add ingame consumer and return total of free spins ([ff62c89](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/ff62c898b1109ef811556d0252f6f3151d3780ca))
* add jackpot model ([6b5ac6e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/6b5ac6e966b11ec12e0cb7b6613bd3a392cf2d9f))
* add place-bet-consumer ([bd0023e](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/bd0023e89cc1445959ea8c261c059a94ac0f0cf0))
* add process bet queue ([18e7aff](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/18e7aff11a345cd1c71b6a279ae543313fc1fc7b))
* add round schema ([f15f0b2](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/f15f0b294626dc7db6654a48858e128c1cb38bcb))
* add slot-history-query ([e0c3d90](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/e0c3d901167cb81204587cc0d9beeca74b3a24d4))
* add slot-notice-helper ([17c0b26](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/17c0b26acf785fdb4ed7809f03b969d81dc2af19))
* add slot-socket-router ([efe1dfc](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/efe1dfcd76cb30cae50db9d731127f63230ad708))
* bonus board generator ([31bbaf5](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/31bbaf5b0c9d7ab3e68230271cd107f3942e9c40))
* bonus consumer and publisher ([e40ba25](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/e40ba257ffcc22f2190e6e13d153eec361253029))
* calculate winning paylines ([7064c0f](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/7064c0fb7316330a623a67335a671cefea940b3a))
* cleanup game-notifications once free spins expired ([1470c9b](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/1470c9b9d4bc611df91639b475387e102b497ec5))
* expose board-calculator as an authorized API ([d6b60b9](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/d6b60b9100fe8c9b2346f00e406abc95aa05a80f))
* implement board-generator ([63f0d40](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/63f0d40f01bd58eab13083b6af03c7a09a1ecb51))
* implement bot ([dee7293](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/dee7293eb27a716d8f37fc123a9df18ac0f0279f))
* implement jackpot consumer ([e57b0db](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/e57b0dbf07313a81ce9be0c5ba518de9cec20630))
* implement paylines calculator ([8226a3d](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/8226a3da4f6fe338b55574b627fd9be0c43b30d8))
* init jackpot pools when starting game ([3bf410f](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/3bf410f22115a297d8bd6fc5cf844814cbbba68a))
* init settle-game-round-consumer ([a10d4d2](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/a10d4d25dd4d2dacabb16ed91c632c17c1deb283))
* out-game-consumer ([8dbe514](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/8dbe5142cee9d92db03b29131e16074c7b75bc6f))
* register slot-socket-router ([c24a6b0](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/c24a6b0f9335577dee6a97266bd1b6c0293a6919))
* return the settlementResult when calling set-board (from Admin) ([b5db33c](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/b5db33c81da600e9da29ea7646ec79761fbfd233))
* send jackpot winner to main game server ([4a83e35](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/4a83e3549aa436ade7dc055d524b765d7865ef74))
* update idcounters when bots place bets ([0190c83](https://git3.nexdev.net/sc-packages/sc-slot-game-base/commit/0190c833ef751b950685fd06bd199600b1d9530e))
