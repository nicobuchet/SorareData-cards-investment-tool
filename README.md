# SorareData-cards-investment-tool

Arc Boost that shows up your cards investments profits in your profile gallery.

## How to set up

Open up your Arc Browser

### Create new boost

Search (CMD+T) for `New Boost` then hit ENTER

## Set up

On the page that just appeared, choose `Custom` then `A specific website`.

After that you'll be asked to enter the website url, copy paste the following input : `https://www.soraredata.com/manager/${YOUR_MANAGER_NAME}/sections/players` and make sure you replaced the placeholder with your manager name.

### Copy paste code

After you created the boost you can copy + paste the content of the `content.js` file of this repo into your created `content.js` file.

### Enjoy

You can now refesh your gallery page and you'll see the magic.

![screenshot](./images/screenshot.png?raw=true)

## How does it works ?

### Card borders

Card borders can have 3 colors:

- Green : the price you paid is bigger than the floor price
- Red : the price you paid is lower than the floor price
- Gray : the price you paid is equal to the floor price

### Differences

- Floor price diff : the variation between the floor price and the price you paid

- 3 days avg diff : the variation between the 3 days average and the price you paid
