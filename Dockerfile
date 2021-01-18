# Base image
FROM ubuntu:20.04

# Environment tools we need for py to run
RUN apt-get update -y && \
    apt-get install -y python3-pip python3-dev

# Using this as our module records to keep up to date
COPY ./requirements.txt /requirements.txt

WORKDIR /

# Go download all our dependencies
RUN pip3 install -r requirements.txt

COPY . /

ENTRYPOINT [ "python3" ]


# Run this ish as the main entry point
CMD [ "app/working-messages.py" ]