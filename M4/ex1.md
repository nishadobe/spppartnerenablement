## Exercise 1 - Data Exploration and Transformation

To create a machine learning model that will recommend products that users might like when they are looking at a particular product, you need to analyze previous purchases made by users on the website. In this lesson, you will explore purchase data flowing via Adobe Analytics to the Platform and transform that data into a Feature DataSet that can help train your machine learning model.

The URL to login to Adobe Experience Platform is: [https://platform.adobe.com](https://platform.adobe.com)

### Exercise 1.1 - Explore the Datasets and XDM Schemas

Experience Data Models (XDM) on Adobe Experience Platform help standardize your data so that it can be used efficiently across your organization.

All interactions that are tracked on the BT website by Adobe Analytics are streamed to Adobe Experience Platform. For our lab, this data is flowing into the 2019 Summit Platform Lab 5 postValues dataset. Let’s explore this data.

Go to [https://platform.adobe.com](https://platform.adobe.com) and log in.

After logging in, you'll see the homepage of Adobe Experience Platform.

![DSW](./images/home.png)

From the left menu, click ```Datasets```.

![DSW](./images/dsmenu.png) 

To develop a product recommendations machine learning model, we are interested in products that users have purchased previously with BT. To streamline the data required to train our machine learning model, we have created a simple schema called Recommendations Input Schema as outlined in the table below (key fields: userid – the user who interacted with the BT Website, timestamp – time of interaction, interactiontype – Purchase, itemid – product that the user interacted with).

In this Tech Lab, we'll be using 3 datasets:

| Dataset Name                   | Dataset Schema      | Description                                    |
|:---------------------------:| :---------------:| :-------------------------------------: |
| 2019 Summit Platform Lab 5 postValues | 2019 Summit Platform Lab 5 Schema v1 | Adobe Analytics source data from the BT website |
| Recommendations Input Dataset | Recommendations Input Schema| The Analytics data is converted into a feature/training dataset using a feature pipeline. This data is used to train the Product Recommendations machine learning model. itemid and userid correspond to a product purchased by that user at time timestamp |
| Recommendations Output Dataset | Recommendations Output Schema| Schema	This is the dataset that you would obtain after scoring. This contains the list of recommended products for each user |

Let's have a look at the Adobe Analytics dataset.

On the Datasets - page, enter the term ```postValues``` in the searchbox.

![DSW](./images/dssearch.png) 

After entering the search term ```postValues```, you'll see 2 results. Open the first dataset, which is named ```2019 Summit Platform Lab 5 postValues```.

![DSW](./images/dsview.png) 
 
By clicking the ```Preview Dataset``` - button, you can see what data is sent into that dataset and how the data model looks like.

![DSW](./images/dspreview.png) 

![DSW](./images/dsdtl.png) 

Close the preview - window of your dataset.

Let's have a look at the schema that was defined for this dataset.

From the left menu, select ```Schemas```.

![DSW](./images/schemamenu.png) 

In the Schemas - overview, scroll to the bottom of the list to find the 3 schemas you'll be using in this lab.

| Schema Name    | 
| :---------------:| 
| Recommendations Input Schema| 
| Recommendations Output Schema|
| 2019 Summit Platform Lab 5 Schema v1|

![DSW](./images/schemaoverview.png)

Let's explore the schema for Adobe Analytics - data, click to open the schema named ```2019 Summit Platform Lab 5 Schema v1```.

![DSW](./images/schemadtl.png) 

### Exercise 1.2 - Open ML Models and load Jupyter Notebooks

Let's get our hands dirty now, by going to Jupyter Notebooks.

In the left menu, click on ```ML Models```.

![DSW](./images/mlmenu.png) 

In the top menu, navigate to ```Notebooks```.

![DSW](./images/nb.png)

You'll now see Jupyter Notebooks loading. This may take 1-2 minutes.

![DSW](./images/nbstarting.png)

While Jupyter Notebooks is starting, locate the folder ```lab20``` on the desktop of your computer.

![DSW](./images/lab20.png)

Open the folder ```lab20```. In this folder, you'll find 3 notebooks. 

![DSW](./images/lab20dtl.png)

You need to select these 3 notebooks and drag them into Jupyter Notebooks.

![DSW](./images/lab20dtldrag.png)

Once all 3 notebooks appear in Jupyter Notebooks, you can continue with the next step.

### Exercise 1.3 - Transform Analytics Data
After the previous exercise, you should now see 3 notebooks available in Jupyter Notebooks inside of Adobe Experience Platform.

![DSW](./images/jup.png)

In Jupyter Notebooks, open the notebook named ```recommendations-feature-transformation.ipynb``` by double-clicking it.

What you'll do next:

  * Define the input and output datasets for this Notebook
  * Read form Platform: Load the input dataset and describe it
  * Filter out empty values
  * Split the item_id into individual records
  * Create a new dataframe that holds the data that we need for our model
  * Write to Platform: Output that dataframe into a dataset in Adobe Experience Platform

#### Define the input and output datasets for this Notebook

Click on the first cell in the notebook.

![DSW](./images/cell1.png)

```
from collections import namedtuple
from pyspark.sql.functions import col,split, explode
inputDataset="5c89949bef707515181cf97a" # 2019 Summit Platform Lab Backup postValues
outputDataset="5c927f59012c9615168ba7ec" # Recommendations Input Dataset
```

Click the play - button to execute this cell.

![DSW](./images/play.png)

The execution of this cell might take 1-2 minutes. Just wait and don't do anything else in this notebook until you the below result.

This is the result:

![DSW](./images/result1.png)

#### Read form Platform: Load the input dataset and describe it

Click on the second cell in the notebook.

![DSW](./images/cell2.png)

```
pd1 = spark.read.format("com.adobe.platform.dataset").option('orgId', "DF6233FB5C538CAE0A495EF3@AdobeOrg").load(inputDataset)
pd1.describe()
```

Click the play - button to execute this cell.

The execution of this cell might take 1-2 minutes. Just wait and don't do anything else in this notebook until you the below result.

![DSW](./images/play.png)

This is the result:

![DSW](./images/result2.png)

#### Filter out empty values

Click on the third cell in the notebook.

![DSW](./images/cell3.png)

```
#Filtering empty values
item_id = "_experience.analytics.customDimensions.eVars.eVar17"
interactionType = "_experience.analytics.customDimensions.eVars.eVar18"
user_id = "_experience.analytics.customDimensions.eVars.eVar16"
timestamp = "timestamp"

pd1 = pd1.filter(pd1[user_id].isNotNull()).filter(pd1[item_id].isNotNull())
```

Click the play - button to execute this cell.

![DSW](./images/play.png)

There is no visual result after this execution. After clicking the play - button, continue to the next step.

#### Split the item_id into individual records

Click on the fourth cell in the notebook.

![DSW](./images/cell4.png)

```
#Splitting item_id to individual records

pd0 = pd1.withColumn("itemId",explode(split(col(item_id), "\|\|")))
pd0.describe()
```

Click the play - button to execute this cell.

![DSW](./images/play.png)

The execution of this cell might take 1-2 minutes. Just wait and don't do anything else in this notebook until you the below result.

This is the result:

![DSW](./images/result4.png)


#### Create a new dataframe that holds the data that we need for our model

Click on the fifth cell in the notebook.

![DSW](./images/cell5.png)

```
df = pd0.selectExpr("_experience.analytics.customDimensions.eVars.eVar16 as userId",
           "itemId as itemId",
           "_experience.analytics.customDimensions.eVars.eVar18 as interactionType",
           "timestamp as timestamp")

_platformlab05 = namedtuple("_platformlab05", ["userId", "itemId", "interactionType", "timestamp"])
output = df.rdd.map(lambda parts: { "_platformlab05" : _platformlab05(parts[0], parts[1],
                                                                                       parts[2], parts[3]),"timestamp":parts[3]
                           } )
df_output = output.toDF()
df_output.printSchema()
```

Click the play - button to execute this cell.

![DSW](./images/play.png)

The execution of this cell might take 1-2 minutes. Just wait and don't do anything else in this notebook until you the below result.

This is the result:

![DSW](./images/result5.png)

#### Write to Platform: Output that dataframe into a dataset in Adobe Experience Platform

Click on the sixth cell in the notebook.

![DSW](./images/cell6.png)

```
userToken = spark.sparkContext.getConf().get('spark.yarn.appMasterEnv.USER_TOKEN')
serviceToken = spark.sparkContext.getConf().get('spark.yarn.appMasterEnv.SERVICE_TOKEN')
serviceApiKey = spark.sparkContext.getConf().get('spark.yarn.appMasterEnv.SERVICE_API_KEY')
df_output.write.format("com.adobe.platform.dataset")\
.option('orgId', "DF6233FB5C538CAE0A495EF3@AdobeOrg")\
.option('userToken', userToken)\
.option('serviceToken', serviceToken)\
.option('serviceApiKey', serviceApiKey)\
.save(outputDataset)
```

Click the play - button to execute this cell.

![DSW](./images/play.png)

There is no visual result after this execution. After clicking the play - button, continue to the next step.

The result in Adobe Experience Platform is that a new batch of data has been created on the ```Recommendations Input Dataset``` which you can verify by going 
[here](https://platform.adobe.com/dataset/browse/5c927f59012c9615168ba7ec/activity?limit=50&page=1&sortDescending=1&sortField=created).

![DSW](./images/1ds.png)

![DSW](./images/1dsb.png)

---

[Next Step: Exercise 2 - Model Authoring and Operationalization](./ex2.md)

[Back to LAB20 Home](./README.md)