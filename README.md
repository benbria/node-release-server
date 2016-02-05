Simple server which shows release notes for multiple projects.

To use, create a config.json in the project root:

    {
        "gh_username": "myname",
        "gh_token": "mysecret",
        "projects": ["benbria/coffee-coverage", "benbria-promise-tools"]
    }

Will render a page that shows tags for each project, and will show comments associated with the last commit for each
tag.  Or, run as a docker project:

    docker run -e "GH_USERNAME=myname" \
        -e "GH_TOKEN=mysecret" \
        -e "PROJECTS=benbria/coffee-coverage,benbria-promise-tools" \
        -p 80:3000 \
        benbria/release-server
