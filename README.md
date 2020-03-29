### explain 
```
не стал делать API с фильтрацией. был плагин для сохранения состояния Vuex в localStorage, 
для того, чтобы состояние после перезагрузки страницы - сохранялось. 
но я его убрал из-за бага несовместимости с моим методом поиска объекта.
все реализовано через глобальное хранилище Vuex.
в хедере имеется search bar, и дропдаун состояния поиска. 
есть 3 состояния:
  1) Все пинтексты. 
  Есть возможность найти по меткам определенный пин 
  (нужно ввести в search bar значения, которые указаны в подсказках). 
  По умолчанию подгружаются все пинтексты (их 3. соответственно, 3 пина - gaming, programming, computers). 
  Поиск осуществляется при помощи встроенного метода indexOf, его я использовал для того, чтобы быстро искать объекты в         глобальном объекте. У этого метода под капотом алгоритм бинарного поиска. Есть возможность сохранить пин к себе 
  (чтобы найти сохранненые пины, надо нажать в дропдауне состояние №3). 
  Также есть возможность удалить пин из сохраненных. 
  Для этого требуется еще раз нажать на кнопку с сохранением закладки.
  2) Ваши пинтексты. Есть возможность найти по меткам определенный пин 
  (нужно ввести в search bar значения, которые указаны в подсказках). 
  На данном этапе появляется кнопка в правом нижнем углу, 
  чтобы добавить свой пин с текстом. Если совпадение неполное - ничего не находится.
  3) Сохраненные пинтексты. Есть возможность найти по меткам определенный пин (нужно ввести в search bar значения, которые указаны в подсказках). Если совпадение неполное - ничего не находится.
В каждом состоянии подсказки - локальные для каждого состояния, это разные объекты, которые отображаются юзеру. 

При состоянии "Все пинтексты" в search bar показываются все метки из Vuex модуля 
(глобальный объект hintsObjectGlobal находится здесь -   https://github.com/designervoid/pintext/blob/master/src/store/modules/hintsGlobal.js), 
в подсказки добавлен префикс global_

При состоянии "Ваши пинтексты" в search bar показываются все метки из Vuex модуля (https://github.com/designervoid/pintext/blob/master/src/store/modules/hintsGlobal.js), в подсказки добавлен префикс user

При состоянии "Сохраненные пинтексты" в search bar показываются все метки из Vuex модуля (https://github.com/designervoid/pintext/blob/master/src/store/modules/hintsUserSaved.js), в подсказки добавлен префикс user_saved

Префиксы были добавлены для того, чтобы отобразить, что это разные метки и разные пины. После суток без сна трудно придумать что то разнообразное и похожее на фейк API данные :)

Также, после поиска в главном контейнере появляется дропдаун с текстом "Выберите пин (категория)". Это подсказка пользователю, что существуют также другие пины по определенному запросу, который он ввел.

В целом, что было реализовано по моей задумке: 
1) поиск глобального пина по меткам
2) если несколько пинов найдено при фильтрации, то отобразить юзеру дропдаун, при нажатии на который юзер сможет в отфильтрованных пинах отфилтровать снова по названию пина. например, ищем по метке global_computer, показывается
  a) GLOBAL - gaming;
  b) GLOBAL - programming; 
  c) GLOBAL - computers. есть возможность отфильтровать по определенному пину снова.
3) изменение состояния. где искать пины, либо в глобальном объекте, либо в юзер объекте, либо в сохраненных пинах.
4) сохранение в закладки, удаление из закладок
5) Добавление нового пина в состояние пинов "Ваши пинтексты".
Что не удалось реализовать по задумке:
1) Профиль пользователя, методы готовы, дело оставалось за малым - допилить интерфейс к нему.
2) Найти наиболее подходящию метку, то есть отфилтровать сразу и отобразить в дропдауне наиболее подходящий вариант.
3) Модальное окно, при нажатии на карточку с текстом.
4) Поиск только по меткам.
```

### before start
```
требуется разрешение больше 960 пикселей. иначе search bar пропадет на мобильной версии.
```

### pintext first steps
```
git clone https://github.com/designervoid/pintext.git
cd pintext
npm install
npm run serve
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
