# Notes
* I learned hot to set up git and commit and then push to github.
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

## CSS

- I learned that it is very important to have a seperate css file that can reference "class", "id", and "type" fields in my html.