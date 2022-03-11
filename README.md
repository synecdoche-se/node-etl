# NodETL

This simple NodeJS app creates an Extract-Transform-Load pipeline for API data and is meant as a demonstration of Node skill and a starting point for a useful pipeline between an API and Google BigQuery.

## Setup

Most of what you need is in this repo. To get started, install packages with:

`npm install`

### BigQuery Loader Setup

You will need a service account key JSON file to use the BigQuery loader. To get one, log in to your Google Cloud Console and open IAM > Service Accounts.

Create a new Service Account with the following access: BigQuery Admin and Google Storage Admin (note that these are broad permissions, and any production application should restrict access to the final set of needed permissions).

Create a new Google Storage bucket called `nodetl`.

In the BigQuery console, create a new dataset called `test` and two tables in that dataset: `hipsterUser` and `userSocial`.

### First Run

After running `node index.js`, you should see two tables filled with data. 

`hipsterUser` takes random dummy user objects and "hipster"fies them.

`userSocial` is a randomly generated social graph of connections between users.

## Room for Improvement

* Many of the values hard-coded in this utility would be better off as `.env` values, such as the GCS bucket, dataset, etc.
* Loading JSON of any non trivial size will require chunking it into jobs in BQ. This was beyond the scope of an MVP exercise.
* Console notices and status indicators would be very nice to have.