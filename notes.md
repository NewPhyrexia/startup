# Note Topics
* essentials: https://github.com/NewPhyrexia/startup/blob/main/mdFiles/essentials.md
* css: https://github.com/NewPhyrexia/startup/blob/main/mdFiles/css.md
* html: https://github.com/NewPhyrexia/startup/blob/main/mdFiles/html.md
* javascript: https://github.com/NewPhyrexia/startup/blob/main/mdFiles/javascript.md
* webServers: https://github.com/NewPhyrexia/startup/blob/main/mdFiles/webServers.md
* webServices: https://github.com/NewPhyrexia/startup/blob/main/mdFiles/webServices.md

# Notes (Other)
* I learned how to set up git, commit and then push to github.
* ssh -i ~/Documents/cs260/keys/[key here] ubuntu@44.218.191.225
* **Cool Stuff:**
* curl -v -s https://byu.edu > /dev/null

## Deploy to production

- Use the `deployFiles.sh` script found in the [example code](https://github.com/webprogramming260/simon-html/blob/main/deployFiles.sh) to deploy Simon to your production environment. Take some time to understand how the script works. The script does three things. Deletes any previous deployment for simon, copies up all of the files found in the project directory, and makes sure Caddy is hosting the files under the `simon` subdomain of your domain (e.g. simon.yourdomain.click).

  ```sh
  ./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s simon
  ```

  For example,

  ```sh
  ./deployFiles.sh -k ~/keys/production.pem -h yourdomain.click -s simon
  ```


