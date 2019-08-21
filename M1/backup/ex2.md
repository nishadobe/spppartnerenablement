## Exercise 2 - Configure Datasets

In this exercise, you'll configure the required datasets to capture and store profile information and customer behavior. Every dataset that you create in this exercise will use one of the schemas that you built in the previous step.

The URL to login to Adobe Experience Platform is: [https://platform.adobe.com](https://platform.adobe.com)

**Attention!**

Please have a look at your computer's number and memorize it. As part of this exercise you'll need to specify your computer's number when you:

  * Create Datasets

 
### Story

After defining what the answer to the questions ```Who is this customer?``` and ```What does this customer do?``` should look like, you now need to create a bucket that uses that information, to receive and validate data that was sent to Adobe Experience Platform.

### Exercise 2.1 - Create Datasets

You now need to create 2 datasets:

  * 1 dataset to capture the information that answers the ```Who is this customer?``` - question.
  * 1 dataset to capture the information that answers the ```What does this customer do?``` - question.

Log in to Adobe Experience Platform by going to this URL: [https://platform.adobe.com](https://platform.adobe.com)

  * Your Username is: techlabXX@adobe.com 
  * Your Password is: techlabXX

After logging in, you'll land on the homepage of Adobe Experience Platform.

![Data Ingestion](./images/home.png)

In Adobe Experience Platform, click on ```Datasets``` in the menu on the left side of your screen.

![Data Ingestion](./images/menudatasets.png)

In Datasets, you'll see a number of already defined datasets. 

![Data Ingestion](./images/datasets.png)

**Let's start by creating the dataset to capture the Website Registration Information.**

You should create a new dataset. To create a new dataset, click on the button ```+ Create Dataset```.

![Data Ingestion](./images/createdataset.png)

After clicking the ```+ Create Dataset``` - button, you'll see the following screen. 

![Data Ingestion](./images/datasetsetup.png)

You have to define a dataset from the schema that you defined in the previous step. Click the ```Create Dataset from Schema``` - option.

![Data Ingestion](./images/datasetfromschema.png)

In the next screen, you have to select the schema that you created in exercise 1.
In the searchbox, search for your schemas by entering the text "Techlab XX" and replace "XX" with your computer's number.

![Data Ingestion](./images/schemaselection.png)

Then select the schema ```Techlab XX - Website Registration Schema```.

![Data Ingestion](./images/schemaselected.png)

After selecting the schema, click ```Next``` to continue.

![Data Ingestion](./images/next.png)


Let's give a name to your dataset. Please use the following naming for your schema:

Look at your computer and locate the computer's number.
**XX** = the number of your tech lab computer.

Example:
  * Computer 1 > replace XX with 01
  * Computer 75 > repelace XX with 75

As the name for our schema, we'll use this:
**Techlab XX - Website Registration Information**

Replace XX with your computer's number. 

Example:

  * Computer 1 > Techlab **01** - Website Registration Information
  * Computer 75 > Techlab **75** - Website Registration Information
  
That should give you something like this:
![Data Ingestion](./images/datasetname.png)

Click ```Finish``` to finish your dataset configuration.

![Data Ingestion](./images/finish.png)

**Next, you'll have to configure a 2nd dataset to capture Website Interactions.**

You should create a new dataset. To create a new dataset, click on the button ```+ Create Dataset```.

![Data Ingestion](./images/createdataset.png)

After clicking the ```+ Create Dataset``` - button, you'll see the following screen. 

![Data Ingestion](./images/datasetsetup.png)

You have to define a dataset from the schema that you defined in the previous step. Click the ```Create Dataset from Schema``` - option.

![Data Ingestion](./images/datasetfromschema.png)

In the next screen, you have to select the schema that you created in exercise 1.
In the searchbox, search for your schemas by entering the text "Techlab XX" and replace "XX" with your computer's number.

![Data Ingestion](./images/schemaselection.png)

Then select the schema ```Techlab XXX - Website Interaction Schema```.

![Data Ingestion](./images/schemaselectedee.png)

After selecting the schema, click ```Next``` to continue.

![Data Ingestion](./images/next.png)


Let's give a name to your dataset. Please use the following naming for your schema:

Look at your computer and locate the computer's number.
**XX** = the number of your tech lab computer.

Example:
  * Computer 1 > replace XX with 01
  * Computer 75 > replace XX with 75

As the name for our schema, we'll use this:
**Techlab XX - Website Interactions**

Replace XX with your computer's number. 

Example:

  * Computer 1 > Techlab **01** - Website Interactions
  * Computer 75 > Techlab **75** - Website Interactions
  
That should give you something like this:
![Data Ingestion](./images/datasetnameee.png)

Click ```Finish``` to finish your dataset configuration.

![Data Ingestion](./images/finish.png)

You should now have created 2 datasets, and you should see both of them in the Datasets Overview screen.

![Data Ingestion](./images/datasetsoverview.png)

You now have to enable your datasets to be part of Adobe Experience Platform's Unified Profile.

Open you dataset **Techlab XX - Website Registration Information** by clicking on it.

Locate the Unified Profile switcher icon on the right side of the screen.

![Data Ingestion](./images/ds1.png)

Click the Unified Profile switcher to enable Unified Profile.

![Data Ingestion](./images/ds2.png)

Click Enable.

![Data Ingestion](./images/ds3.png)

Your dataset is now enabled for Unified Profile.

Open you dataset **Techlab XX - Website Interactions** by clicking on it.

Locate the Unified Profile switcher icon on the right side of the screen.

![Data Ingestion](./images/ds4.png)

Click the Unified Profile switcher to enable Unified Profile.

![Data Ingestion](./images/ds2.png)

Click Enable.

![Data Ingestion](./images/ds5.png)

Your dataset is now enabled for Unified Profile.

With the datasets created and configured for Unified Profile, you can now continue and start the Launch configuration to capture data on your BT website.

---

[Next Step: Exercise 3 - Create Streaming Endpoint](./ex3.md)