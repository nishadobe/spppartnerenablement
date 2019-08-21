# Lesson 7.4 - Using the Query Service with Power BI/Tableau

## Objective

Learn how to generate datasets from query results
Connect Microsoft Power BI Desktop/Tableau directly to the Query Service
Creating a report in Microsoft Power BI Desktop/Tableau Desktop

## Lesson Context

A command line interface to query data is exciting but it doesn't present well. In this lesson, we will guide you through a recommended workflow for how you can use Microsoft Power BI Desktop/Tableau directly the Query Service to create visual reports for your stakeholders.

## Exercise 7.4.1 Create a dataset from a SQL query

The complexity of your query will impact how long it takes for the Query Service to return results. And when querying directly from the command line or other solutions like Microsoft Power BI/Tableau the Query Service is configured with a 5 minute timeout (600 seconds). And in certain cases these solutions will be configured with shorter timeouts. To run larger queries and front load the time it takes to return results we offer a feature to generate a dataset from the query results. This feature utilizes the standard SQL feature know as Create Table As Select (CTAS). It is available in the Platform UI from the Query List and also available to be run directly from the command line with PSQL.

In the previous exercise you should have replaced "enter your ldap name" with your own ldapbefore executing it in PSQL.

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

Navigate to the Platform UI - https://platform.adobe.com
 

You will search for your executed statement in the Adobe Experience Platform Query UI by entering your ldap in the search field:

Select "Queries" (1), enter your computer number in the search field (2), select your query (3)

![search-query-for-ctas.png](../resources/search-query-for-ctas.png)

and click "Output Dataset" (4).

Enter "**ldap** Callcenter Interaction Analysis" as name and description for the dataset and press the "Run Query" button

![create-ctas-dataset.png](../resources/create-ctas-dataset.png)

As a result, you will see a new query with a status "Submitted".

![ctas-query-submitted.png](../resources/ctas-query-submitted.png)

Upon completion, you will see a new entry for "Dataset Created" (you might need to refresh the page).

![ctas-dataset-created.png](../resources/ctas-dataset-created.png)

As soon as you dataset is created you can continue the exercise.

Next Step - Option A: [Exercise 7.4.2 Explore the dataset with Power BI](../exercises/4-2-a-powerbi.md)

Next Step - Option B: [Exercise 7.4.2 Explore the dataset with Tableau](../exercises/4-2-b-tableau.md)

[Go Back to Module 7](../README.md)

[Go Back to All Modules](../../README.md)

