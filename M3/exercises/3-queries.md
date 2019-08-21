# Exercise 7.3 - Queries, queries, queries,... and churn analysis

## Objective

- Write queries for data analyses
- Write SQL queries combining online, callcenter and loyalty data avialable in Adobe Experience Platform
- Learn about Adobe Defined Functions

## Lesson Context

In this exercises you will write queries to analyse product views, product funnels, churn etc.

All queries listed in this chapter will be executed in your **PSQL command-line interface**. You should copy (CTRL-c) the statement blocks indicated with **SQL** and paste (CTRL-v)them in the **PSQL command-line interface**. The **Query Result** blocks show the pasted SQL statement and the associated query result.

## Exercise 7.3.1

Write basic queries for data analysis

### Timestamp

Data captured in Adobe Experience Platform is time stamped. The "timestamp" attribute allows you to analyse data over time.

How many product views do we have on a daily basis? 

**SQL**

```sql
select date_format( timestamp , 'yyyy-MM-dd') AS Day,
       count(*) AS productViews
from   bt_website_interactions
where  _platformlab05.brand.brandName like 'Luma Telco'
and    _platformlab05.productData.productInteraction = 'productView'
group by Day
limit 10;
```

Copy the statement above and execute it in your **PSQL command-line interface**.

**Query Result**

```text
all=> 
all=> select date_format( timestamp , 'yyyy-MM-dd') AS Day,
all->        count(*) AS productViews
all-> from   bt_website_interactions
all-> where  _platformlab05.brand.brandName like 'Luma Telco'
all-> and    _platformlab05.productData.productInteraction = 'productView'
all-> group by Day
all-> limit 10;
    Day     | productViews 
------------+--------------
 2019-06-16 |         2260
(1 row)

all=> 
```

### Top 5 products viewed

What are the top 5 products viewed?

**SQL**

```sql
select _platformlab05.productData.productName, count(*)
from   bt_website_interactions
where  _platformlab05.brand.brandName like 'Luma Telco'
and    _platformlab05.productData.productInteraction = 'productView'
group  by _platformlab05.productData.productName
order  by 2 desc
limit 5;
```

Copy the statement above and execute it in your **PSQL command-line interface**.

**Query Result**

```text
all=> 
all=> select _platformlab05.productData.productName, count(*)
all-> from   bt_website_interactions
all-> where  _platformlab05.brand.brandName like 'Luma Telco'
all-> and    _platformlab05.productData.productInteraction = 'productView'
all-> group  by _platformlab05.productData.productName
all-> order  by 2 desc
all-> limit 5;
              productname              | count(1) 
---------------------------------------+----------
 Google Pixel XL 32GB Black Smartphone |      871
 Samsung Galaxy S7 32GB Black          |      482
 Samsung Galaxy S8                     |      457
 SIM Only                              |      450
(4 rows)

all=>  
```

### Product Interaction funnel, from viewing to buying

**SQL**

```sql
select _platformlab05.productData.productInteraction, count(*)
from   bt_website_interactions
where  _platformlab05.brand.brandName like 'Luma Telco'
and    _platformlab05.productData.productInteraction is not null
group  by _platformlab05.productData.productInteraction;
```

Copy the statement above and execute it in your **PSQL command-line interface**.

**Query Result**

```text
all=> 
all=> select _platformlab05.productData.productInteraction, count(*)
all-> from   bt_website_interactions
all-> where  _platformlab05.brand.brandName like 'Luma Telco'
all-> and    _platformlab05.productData.productInteraction is not null
all-> group  by _platformlab05.productData.productInteraction;

 productinteraction | count(1) 
--------------------+----------
 productView        |     2260
 productAddToCart   |      554
 productPurchase    |      251
(3 rows)

all=>  
```


### Identify visitors with risk to Churn (visit page => Cancel Service)

**SQL**

```sql
select distinct _platformlab05.identification.ecid
from   bt_website_interactions
where  _platformlab05.brand.brandName like 'Luma Telco'
and    web.webPageDetails.name = 'Cancel Service'
group  by _platformlab05.identification.ecid
limit 10;
```

Copy the statement above and execute it in your **PSQL command-line interface**.

**Query Result**

```text
all=> 
all=> select distinct _platformlab05.identification.ecid
all-> from   bt_website_interactions
all-> where  _platformlab05.brand.brandName like 'Luma Telco'
all-> and    web.webPageDetails.name = 'Cancel Service'
all-> group  by _platformlab05.identification.ecid
all-> limit 10;
               ecid               
----------------------------------
 16840282692567409512738085083124
 61078464596244340558263746344113
 67550254189152640330673862781287
 41960120232527468228415511964616
 89687328800348208661758433679450
 88878080294969230463386902460350
 16446318267724026061153928852297
 05129335423558173081574046306667
 30954842187077349630489483172285
 67303048231925605487990717711467
(10 rows)

all=> 
```

In the next set of queries we will extend the above query, in order to get a complete view on the customers and their behavior that have been visiting the "Cancel Service" page. You will learn how to use the Adobe Defined Function to sessionize information, identify the sequence and timiong of events. You will also join datasets together to further enrich and prepare the data for analysis in Microsoft Power BI.

## Exercise 7.3.2

The majority of the business logic requires gathering the touchpoints for a customer and ordering them by time. This support is provided by Spark SQL in the form of window functions. Window functions are part of standard SQL and are supported by many other SQL engines.

### Adobe Defined Functions

Adobe has added a set of **Adobe Defined Functions** to the standard SQL syntax that allow you to better understand your experience data. In the next couple of queries you will learn about these ADF functions. You can find more information and the complete list via [Adobe IO](https://www.adobe.io/apis/experienceplatform/home/services/query-service/query-service.html#!acpdr/end-user/markdown/query-service/qs-queries-adobefunctions.md).

### What do people do on the site before reaching the "Cancel Service" page as the 3rd page in a session?

With this query you will discover the first two Adobe Defined Functions **SESS_TIMEOUT** and **NEXT**

> The **SESS_TIMEOUT()** reproduces the visit groupings found with Adobe Analytics. It performs a similar time-based grouping, but customizable parameters.

> **NEXT()** and **PREVIOUS()** help you to understand how customers navigate your site.

**SQL**

```sql
SELECT 
  webPage,
  webPage_2,
  webPage_3,
  webPage_4,
  count(*) journeys
FROM
  (
      SELECT
        webPage,
        NEXT(webPage, 1, true)
          OVER(PARTITION BY ecid, session.num
                ORDER BY timestamp
                ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING).value
          AS webPage_2,
        NEXT(webPage, 2, true)
          OVER(PARTITION BY ecid, session.num
                ORDER BY timestamp
                ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING).value
          AS webPage_3,
        NEXT(webPage, 3, true)
           OVER(PARTITION BY ecid, session.num
                ORDER BY timestamp
                ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING).value
          AS webPage_4,
        session.depth AS SessionPageDepth
      FROM (
            select a._platformlab05.identification.ecid as ecid,
                   a.timestamp,
                   web.webPageDetails.name as webPage,
                    SESS_TIMEOUT(timestamp, 60 * 30) 
                       OVER (PARTITION BY a._platformlab05.identification.ecid 
                             ORDER BY timestamp 
                             ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) 
                  AS session
            from   bt_website_interactions a
            where  a._platformlab05.identification.ecid in ( 
                select b._platformlab05.identification.ecid
                from   bt_website_interactions b
                where  b._platformlab05.brand.brandName like 'Luma Telco'
                and    b.web.webPageDetails.name = 'Cancel Service'
            )
        )
)
WHERE SessionPageDepth=1
and   webpage_3 = 'Cancel Service'
GROUP BY webPage, webPage_2, webPage_3, webPage_4
ORDER BY journeys DESC
LIMIT 10;
```

Copy the statement above and execute it in your **PSQL command-line interface**.

**Query Result**

```text
                webPage                |               webPage_2               |   webPage_3    | webPage_4  | journeys 
---------------------------------------+---------------------------------------+----------------+------------+----------
 Broadband Deals                       | BT Sport                              | Cancel Service |            |        2
 Samsung Galaxy S7 32GB Black          | Telco Home                            | Cancel Service | Call Start |        2
 BT Sport                              | Broadband Deals                       | Cancel Service |            |        2
 Samsung Galaxy S8                     | Samsung Galaxy S7 32GB Black          | Cancel Service |            |        2
 SIM Only                              | BT Sport                              | Cancel Service |            |        2
 Samsung Galaxy S8                     | Google Pixel XL 32GB Black Smartphone | Cancel Service |            |        2
 Google Pixel XL 32GB Black Smartphone | Google Pixel XL 32GB Black Smartphone | Cancel Service | Call Start |        1
 Telco Home                            | BT Sport                              | Cancel Service |            |        1
 Samsung Galaxy S7 32GB Black          | Samsung Galaxy S7 32GB Black          | Cancel Service |            |        1
 Telco Home                            | SIM Only                              | Cancel Service | Call Start |        1
(10 rows)

all=> 
```

### How much time do we have before a visitor calls the call center after visiting the "Cancel Service" Page?

To answer this kind of query will we use the ``TIME_BETWEEN_NEXT_MATCH()`` Adobe Defined Function.

> Time-between previous or next match functions provide a new dimension, which measures the time that has elapsed since a particular incident.

**SQL**

```sql
select * from (
       select _platformlab05.identification.ecid as ecid,
              web.webPageDetails.name as webPage,
              TIME_BETWEEN_NEXT_MATCH(timestamp, web.webPageDetails.name='Call Start', 'seconds')
              OVER(PARTITION BY _platformlab05.identification.ecid
                  ORDER BY timestamp
                  ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING)
              AS contact_callcenter_after_seconds
       from   bt_website_interactions
       where  _platformlab05.brand.brandName like 'Luma Telco'
       and    web.webPageDetails.name in ('Cancel Service', 'Call Start')
) r
where r.webPage = 'Cancel Service'
limit 15;
```

Copy the statement above and execute it in your **PSQL command-line interface**.

**Query Result**

```text
               ecid               |    webPage     | contact_callcenter_after_seconds 
----------------------------------+----------------+----------------------------------
 16840282692567409512738085083124 | Cancel Service |                             -682
 61078464596244340558263746344113 | Cancel Service |                             -992
 67550254189152640330673862781287 | Cancel Service |                                 
 41960120232527468228415511964616 | Cancel Service |                             -413
 89687328800348208661758433679450 | Cancel Service |                             -660
 88878080294969230463386902460350 | Cancel Service |                                 
 16446318267724026061153928852297 | Cancel Service |                                 
 05129335423558173081574046306667 | Cancel Service |                             -338
 30954842187077349630489483172285 | Cancel Service |                                 
 67303048231925605487990717711467 | Cancel Service |                                 
 46287808668627830610738182996314 | Cancel Service |                                 
 51445169960384754128107207557090 | Cancel Service |                                 
 27152426490361339828046162469720 | Cancel Service |                             -233
 99710552953080861204321940836318 | Cancel Service |                                 
 64912713120337228765590984621892 | Cancel Service |                             -921
(15 rows)

all=> 
```

### And what is the outcome of that contact?

Explain that we are joining datasets together, in this case we join our bt_website_interactions with bt_call_center_interactions. We do this to know the outcome of the callcenter interaction.

**SQL**

```sql
select r.*,
       c._platformlab05.callDetails.callFeeling,
       c._platformlab05.callDetails.callTopic,
       c._platformlab05.callDetails.contractCancelled
from (
       select _platformlab05.identification.ecid ecid,
              web.webPageDetails.name as webPage,
              TIME_BETWEEN_NEXT_MATCH(timestamp, web.webPageDetails.name='Call Start', 'seconds')
              OVER(PARTITION BY _platformlab05.identification.ecid
                  ORDER BY timestamp
                  ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING)
              AS contact_callcenter_after_seconds
       from   bt_website_interactions
       where  _platformlab05.brand.brandName like 'Luma Telco'
       and    web.webPageDetails.name in ('Cancel Service', 'Call Start')
) r
, bt_call_center_interactions c
where r.ecid = c._platformlab05.identification.ecid
and r.webPage = 'Cancel Service'
limit 15;
```

Copy the statement above and execute it in your **PSQL command-line interface**.

**Query Result**

```text
               ecid               |    webPage     | contact_callcenter_after_seconds | callfeeling | calltopic | contractcancelled 
----------------------------------+----------------+----------------------------------+-------------+-----------+-------------------
 16840282692567409512738085083124 | Cancel Service |                             -682 | positive    | contract  | no
 61078464596244340558263746344113 | Cancel Service |                             -992 | negative    | contract  | no
 67550254189152640330673862781287 | Cancel Service |                                  | none        | none      | no
 41960120232527468228415511964616 | Cancel Service |                             -413 | negative    | contract  | no
 89687328800348208661758433679450 | Cancel Service |                             -660 | neutral     | contract  | no
 88878080294969230463386902460350 | Cancel Service |                                  | none        | none      | no
 16446318267724026061153928852297 | Cancel Service |                                  | none        | none      | no
 05129335423558173081574046306667 | Cancel Service |                             -338 | positive    | contract  | no
 30954842187077349630489483172285 | Cancel Service |                                  | none        | none      | no
 67303048231925605487990717711467 | Cancel Service |                                  | none        | none      | no
 46287808668627830610738182996314 | Cancel Service |                                  | none        | none      | no
 51445169960384754128107207557090 | Cancel Service |                                  | none        | none      | no
 27152426490361339828046162469720 | Cancel Service |                             -233 | positive    | contract  | yes
 99710552953080861204321940836318 | Cancel Service |                                  | none        | none      | no
 64912713120337228765590984621892 | Cancel Service |                             -921 | neutral     | contract  | no
(15 rows)

all=> 
```

### What is the loyalty profile of these customers?

In this query we join loyalty data that we have onboarded in Adobe Experience Platform. This allows to enrich the churn analysis with loyalty data.

**SQL**

```sql
select r.*,
       c._platformlab05.callDetails.callFeeling,
       c._platformlab05.callDetails.callTopic,
       l.loyaltystatus,
       l.crmid
from (
       select _platformlab05.identification.ecid ecid,
              web.webPageDetails.name as webPage,
              TIME_BETWEEN_NEXT_MATCH(timestamp, web.webPageDetails.name='Call Start', 'seconds')
              OVER(PARTITION BY _platformlab05.identification.ecid
                  ORDER BY timestamp
                  ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING)
              AS contact_callcenter_after_seconds
       from   bt_website_interactions
       where  _platformlab05.brand.brandName like 'Luma Telco'
       and    web.webPageDetails.name in ('Cancel Service', 'Call Start')
) r
, bt_call_center_interactions c
, bt_loyalty_data l
where r.ecid = c._platformlab05.identification.ecid
and r.webPage = 'Cancel Service'
and l.ecid = r.ecid
limit 15;
```

Copy the statement above and execute it in your **PSQL command-line interface**.

**Query Result**

```text
               ecid               |    webPage     | contact_callcenter_after_seconds | callfeeling | calltopic | loyaltystatus |   crmid   
----------------------------------+----------------+----------------------------------+-------------+-----------+---------------+-----------
 16840282692567409512738085083124 | Cancel Service |                             -682 | positive    | contract  | silver        | 068202008
 61078464596244340558263746344113 | Cancel Service |                             -992 | negative    | contract  | bronze        | 543311130
 67550254189152640330673862781287 | Cancel Service |                                  | none        | none      | silver        | 178911018
 41960120232527468228415511964616 | Cancel Service |                             -413 | negative    | contract  | bronze        | 746081747
 89687328800348208661758433679450 | Cancel Service |                             -660 | neutral     | contract  | gold          | 957806157
 88878080294969230463386902460350 | Cancel Service |                                  | none        | none      | silver        | 693411346
 16446318267724026061153928852297 | Cancel Service |                                  | none        | none      | silver        | 433375784
 05129335423558173081574046306667 | Cancel Service |                             -338 | positive    | contract  | bronze        | 271098686
 30954842187077349630489483172285 | Cancel Service |                                  | none        | none      | gold          | 759695683
 67303048231925605487990717711467 | Cancel Service |                                  | none        | none      | bronze        | 211072657
 46287808668627830610738182996314 | Cancel Service |                                  | none        | none      | gold          | 969541622
 51445169960384754128107207557090 | Cancel Service |                                  | none        | none      | silver        | 623254233
 27152426490361339828046162469720 | Cancel Service |                             -233 | positive    | contract  | bronze        | 900906023
 99710552953080861204321940836318 | Cancel Service |                                  | none        | none      | gold          | 224921451
 64912713120337228765590984621892 | Cancel Service |                             -921 | neutral     | contract  | bronze        | 100441117
(15 rows)

all=> 

```

### From what region do the visit us?

Lets include the geographical info, like longitude, lattitude, city, countrycode, captured by the Adobe Experience Platform in order to get some geographical insights about churning customers.

**SQL**

```sql
select r.ecid,
       r.city,
       r.countrycode,
       r.lat as latitude,
       r.lon as longitude,
       r.contact_callcenter_after_seconds as seconds_to_contact_callcenter,
       c._platformlab05.callDetails.callFeeling,
       c._platformlab05.callDetails.callTopic,
       c._platformlab05.callDetails.contractCancelled,
       l.loyaltystatus,
       l.crmid
from (
       select _platformlab05.identification.ecid ecid,
              placeContext.geo._schema.latitude lat,
              placeContext.geo._schema.longitude lon,
              placeContext.geo.city,
              placeContext.geo.countryCode,
              web.webPageDetails.name as webPage,
              TIME_BETWEEN_NEXT_MATCH(timestamp, web.webPageDetails.name='Call Start', 'seconds')
              OVER(PARTITION BY _platformlab05.identification.ecid
                  ORDER BY timestamp
                  ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING)
              AS contact_callcenter_after_seconds
       from   bt_website_interactions
       where  _platformlab05.brand.brandName like 'Luma Telco'
       and    web.webPageDetails.name in ('Cancel Service', 'Call Start')
) r
, bt_call_center_interactions c
, bt_loyalty_data l
where r.ecid = c._platformlab05.identification.ecid
and r.webPage = 'Cancel Service'
and l.ecid = r.ecid
limit 15;
```

Copy the statement above and execute it in your **PSQL command-line interface**.

**Query Result**

```text
               ecid               |   city    | countrycode |  latitude  | longitude | seconds_to_contact_callcenter | callfeeling | calltopic | contractcancelled | loyaltystatus |   crmid   
----------------------------------+-----------+-------------+------------+-----------+-------------------------------+-------------+-----------+-------------------+---------------+-----------
 16840282692567409512738085083124 | Tournai   | BE          |  50.585206 | 3.3300918 |                          -682 | positive    | contract  | no                | silver        | 068202008
 61078464596244340558263746344113 | Bruxelles | BE          | 50.7881573 | 4.4180065 |                          -992 | negative    | contract  | no                | bronze        | 543311130
 67550254189152640330673862781287 | Bouillon  | BE          | 49.8417042 | 5.1214901 |                               | none        | none      | no                | silver        | 178911018
 41960120232527468228415511964616 | Ath       | BE          | 50.6302806 | 3.8861843 |                          -413 | negative    | contract  | no                | bronze        | 746081747
 89687328800348208661758433679450 | Mons      | BE          | 50.4271996 |  3.989666 |                          -660 | neutral     | contract  | no                | gold          | 957806157
 88878080294969230463386902460350 | Ath       | BE          | 50.6302806 | 3.8861843 |                               | none        | none      | no                | silver        | 693411346
 16446318267724026061153928852297 | Tournai   | BE          |   50.59219 | 3.4387783 |                               | none        | none      | no                | silver        | 433375784
 05129335423558173081574046306667 | Péruwelz  | BE          | 50.5474037 | 3.5567339 |                          -338 | positive    | contract  | no                | bronze        | 271098686
 30954842187077349630489483172285 | Mons      | BE          | 50.4271996 |  3.989666 |                               | none        | none      | no                | gold          | 759695683
 67303048231925605487990717711467 | Mons      | BE          | 50.4271996 |  3.989666 |                               | none        | none      | no                | bronze        | 211072657
 46287808668627830610738182996314 | Bruxelles | BE          | 50.7881573 | 4.4180065 |                               | none        | none      | no                | gold          | 969541622
 51445169960384754128107207557090 | Charleroi | BE          | 50.4315612 | 4.4472854 |                               | none        | none      | no                | silver        | 623254233
 27152426490361339828046162469720 | Charleroi | BE          | 50.4315612 | 4.4472854 |                          -233 | positive    | contract  | yes               | bronze        | 900906023
 99710552953080861204321940836318 | Bouillon  | BE          | 49.8417042 | 5.1214901 |                               | none        | none      | no                | gold          | 224921451
 64912713120337228765590984621892 | Namur     | BE          | 50.4198861 | 4.9246444 |                          -921 | neutral     | contract  | no                | bronze        | 100441117
(15 rows)

all=> 
```

## Callcenter Interaction Analysis

In the queries above we only looked at the visitors that ended up contacting the callcenter in case of service cancellation. We want to take this a bit broader and take into account all callcenter interaction including (wifi, promo, invoice, complaint and contract).  

You will need to edit a query, so let's first open notepad or brackets.

On Windows click "search"-icon (1) in the windows toolbar, type **notepad** in the "search"-field (2), click (3) the "notepad" result:

![windows-start-notepad.png](../resources/windows-start-notepad.png)

On Mac

![osx-start-brackets.png](../resources/osx-start-brackets.png)

Copy the following statement to notepad/brackts:

```sql
select /* enter your ldap name */
       e._platformlab05.identification.ecid as ecid,
       e.placeContext.geo.city as city,
       e.placeContext.geo._schema.latitude latitude,
       e.placeContext.geo._schema.longitude longitude,
       e.placeContext.geo.countryCode as countrycode,
       c._platformlab05.callDetails.callFeeling as callFeeling,
       c._platformlab05.callDetails.callTopic as callTopic,
       c._platformlab05.callDetails.contractCancelled as contractCancelled,
       l.loyaltystatus as loyaltystatus,
       l.loyaltypoints as loyaltypoints,
       l.crmid as crmid
from   bt_website_interactions e
      ,bt_call_center_interactions c
      ,bt_loyalty_data l
where  e._platformlab05.brand.brandName like 'Luma Telco'
and    e.web.webPageDetails.name in ('Cancel Service', 'Call Start')
and    e._platformlab05.identification.ecid = c._platformlab05.identification.ecid
and    l.ecid = e._platformlab05.identification.ecid;
```

And replace 

```text
enter your ldap name
```

Do not remove **/\*** and **\*/**. Your modified statement in notepad should look like:

Notepad:

![edit-query-notepad.png](../resources/edit-query-notepad.png)

Brackets:

![edit-query-brackets.png](../resources/edit-query-brackets.png)

Copy your modified statement from **notepad** into the **PSQL command line window** and hit enter. You should see the following result in the PSQL command line window:

```text
all=> 
all=> select /* mmeewis */
all->        e._platformlab05.identification.ecid as ecid,
all->        e.placeContext.geo.city as city,
all->        e.placeContext.geo._schema.latitude latitude,
all->        e.placeContext.geo._schema.longitude longitude,
all->        e.placeContext.geo.countryCode as countrycode,
all->        c._platformlab05.callDetails.callFeeling as callFeeling,
all->        c._platformlab05.callDetails.callTopic as callTopic,
all->        c._platformlab05.callDetails.contractCancelled as contractCancelled,
all->        l.loyaltystatus as loyaltystatus,
all->        l.loyaltypoints as loyaltypoints,
all->        l.crmid as crmid
all-> from   bt_website_interactions e
all->       ,bt_call_center_interactions c
all->       ,bt_loyalty_data l
all-> where  e._platformlab05.brand.brandName like 'Luma Telco'
all-> and    e.web.webPageDetails.name in ('Cancel Service', 'Call Start')
all-> and    e._platformlab05.identification.ecid = c._platformlab05.identification.ecid
all-> and    l.ecid = e._platformlab05.identification.ecid;
               ecid               |   city    |  latitude  | longitude | countrycode | callFeeling | callTopic | contractCancelled | loyaltystatus | loyaltypoints |   crmid   
----------------------------------+-----------+------------+-----------+-------------+-------------+-----------+-------------------+---------------+---------------+-----------
 66314407739839583412774742524393 | Gent      | 51.0003903 | 3.7139045 | BE          | negative    | invoice   | no                | gold          | 891           | 808146217
 46840598548096396977535499473546 | Tournai   |  50.585206 | 3.3300918 | BE          | negative    | wifi      | no                | bronze        | 688           | 415500611
 30924397186642752341570875177577 | Bouillon  | 49.8417042 | 5.1214901 | BE          | positive    | wifi      | no                | gold          | 266           | 278274116
 98207032527904958251399381428859 | Antwerpen | 51.2472392 | 4.4403455 | BE          | positive    | complaint | no                | gold          | 66            | 655212019
 96532137524832369739003472754257 | Momignies | 50.0109884 | 4.1638985 | BE          | negative    | contract  | yes               | bronze        | 486           | 487961965
 96532137524832369739003472754257 | Momignies | 50.0109884 | 4.1638985 | BE          | negative    | contract  | yes               | bronze        | 486           | 487961965
 18489324799512064071685324475593 | Tournai   |  50.585206 | 3.3300918 | BE          | negative    | contract  | no                | silver        | 346           | 232142006
 18489324799512064071685324475593 | Tournai   |  50.585206 | 3.3300918 | BE          | negative    | contract  | no                | silver        | 346           | 232142006
 85975237613736074525762323778723 | Tournai   |  50.585206 | 3.3300918 | BE          | neutral     | promo     | no                | bronze        | 204           | 979168848
 00903156694747370543201849492870 | Gent      | 51.0003903 | 3.7139045 | BE          | neutral     | contract  | yes               | silver        | 115           | 447940837
 00903156694747370543201849492870 | Gent      | 51.0003903 | 3.7139045 | BE          | neutral     | contract  | yes               | silver        | 115           | 447940837
 74975631650382947340118672142876 | Momignies | 50.0109884 | 4.1638985 | BE          | positive    | contract  | yes               | silver        | 666           | 311211405
 74975631650382947340118672142876 | Momignies | 50.0109884 | 4.1638985 | BE          | positive    | contract  | yes               | silver        | 666           | 311211405
 22950817399552008399236079563464 | Antwerpen | 51.2472392 | 4.4403455 | BE          | positive    | contract  | yes               | silver        | 550           | 315243154
 22950817399552008399236079563464 | Antwerpen | 51.2472392 | 4.4403455 | BE          | positive    | contract  | yes               | silver        | 550           | 315243154
 99476152721108938534906841261262 | Bruxelles | 50.8235717 | 4.3766927 | BE          | neutral     | contract  | yes               | silver        | 972           | 723384819
 99476152721108938534906841261262 | Bruxelles | 50.8235717 | 4.3766927 | BE          | neutral     | contract  | yes               | silver        | 972           | 723384819
 56189052164051563942578091708819 | Gent      | 51.0003903 | 3.7139045 | BE          | positive    | wifi      | no                | silver        | 515           | 669134301
 37840986132104964349554649284135 | Mons      | 50.4271996 |  3.989666 | BE          | neutral     | invoice   | no                | gold          | 305           | 047645576
 48419768413698538252322497822017 | Charleroi | 50.4315612 | 4.4472854 | BE          | positive    | contract  | no                | silver        | 895           | 181257072
 32301655227521504967996346059120 | Momignies | 50.0109884 | 4.1638985 | BE          | negative    | promo     | no                | bronze        | 800           | 242493209
 71942225541834503351303227218668 | Bruxelles | 50.8235717 | 4.3766927 | BE          | neutral     | invoice   | no                | bronze        | 28            | 457299431
 85411528264944634237780379504134 | Bruxelles | 50.7881573 | 4.4180065 | BE          | none        | none      | no                | gold          | 520           | 463127428
 33479887875760422634413789184167 | Charleroi | 50.4315612 | 4.4472854 | BE          | none        | none      | no                | gold          | 948           | 486716664
 75403851999128493287105493586445 | Charleroi | 50.4315612 | 4.4472854 | BE          | none        | none      | no                | gold          | 971           | 335713932
 13301471912006520543859303708435 | Antwerpen | 51.2472392 | 4.4403455 | BE          | none        | none      | no                | silver        | 544           | 694758140
 04826746984209500823549564548678 | Péruwelz  | 50.5474037 | 3.5567339 | BE          | none        | none      | no                | gold          | 438           | 900341300
 33479297454311413752923509531987 | Momignies | 50.0109884 | 4.1638985 | BE          | negative    | promo     | no                | gold          | 226           | 508327647
 61078464596244340558263746344113 | Bruxelles | 50.7881573 | 4.4180065 | BE          | negative    | contract  | no                | bronze        | 979           | 543311130
 61078464596244340558263746344113 | Bruxelles | 50.7881573 | 4.4180065 | BE          | negative    | contract  | no                | bronze        | 979           | 543311130
 41601353098586834686593837232420 | Tournai   |  50.585206 | 3.3300918 | BE          | none        | none      | no                | bronze        | 472           | 877174427
-- More  --
```

In the next exercise you will persist your query (also known as **create table as select** or **CTAS**) as a new dataset that you will use in Microsoft Power BI.

Next Step: [Exercise 4 - Power BI/Tableau](../exercises/4-power-bi.md)

[Go Back to Module 7](../README.md)

[Go Back to All Modules](../../README.md)
