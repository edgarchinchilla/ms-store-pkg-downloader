# ms-store-pkg-downloader
This site is published on [Github.io](https://edgarchinchilla.github.io/ms-store-pkg-downloader/) using the _Github Pages_ technology and provides a mechanism to automatically generate the list of available standalone packages (_.appx, .appxbundle, .msix, .msixbundle_) for an application published on Microsoft Store for an especific ring (Retail, Release Preview, Slow, Fast) using the API of `rg-adguard.net` for MS Store available at [https://store.rg-adguard.net/api/GetFiles](https://store.rg-adguard.net/api/GetFiles)

You can use public service of `rg-adguard.net` available at [https://store.rg-adguard.net/](https://store.rg-adguard.net/), but that services requires you known the AppID or alternatively, first visit the desired application page in the MS Store, copy its link, return to `rg-adguard.net` service and paste the link, select the desired ring and then, generate the standalone packages list.

This site shows a list of _Common Apps_ (published in the MS Store) without the need to search the AppID by yourself and provides a one button per ring to generate the standalone packages list of the App for any ring in a fast an easy way.

In an effort to provide an easy way to contribute to the apps list, all what you need to add an App to the list is to add an entry in the JSON file at `www/assets/data.json` on this repo.
