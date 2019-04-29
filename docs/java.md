# Java SDK

## Before You Begin

Please note that the Java SDK is still in-development and is subject to breaking changes between
minor version updates.

## Setup

The source code for the Java SDK can be found at https://github.com/enjin/Enjin-Coin-Java-SDK.

#### Maven

```xml
<dependency>
  <groupId>com.enjin</groupId>
  <artifactId>enjincoin-java-sdk</artifactId>
  <version>0.6.0-SNAPSHOT</version>
</dependency>

<repositories>
  <repository>
    <id>sonatype-nexus-public</id>
    <url>https://oss.sonatype.org/content/groups/public/</url>
  </repository>
</repositories>
```

#### Gradle

```groovy
dependencies {
    implementation 'com.enjin:enjincoin-java-sdk:0.6.0-SNAPSHOT'
}

repositories {
    maven {
        url 'https://oss.sonatype.org/content/groups/public/'
    }
}
```

The Enjin Coin Java SDK requires at a minimum Java 8.

## Getting Started

#### Client Creation and Authentication

To query the Trusted Platform using the Java SDK we start out by creating a new client instance
and authenticating our application. The following is an example of how to create a client:

```java
public Client createSdkClient() {
    return Clients.createClient(
        "https://kovan.cloud.enjin.io/", // The base url of the trusted platform you wish to communicate with.
        307, // The id of your app.
        466 // The identity associated with your dev user account.
    );
}
```

Next step is to authenticate our client using the app secret. To obtain the app secret you can execute
the following query on the Trusted Platform GraphQL interface:

```graphql
query GetAppSecret {
    EnjinApps(id: 307) {
        secret
    }
}
```

The following is an example of how to authenticate a client:

```java
public Client createAndAuthClient(String secret) {
    Client client = createSdkClient();
    client.auth(secret);
    return client;
}
```

One thing to keep in mind is that the ```Client#auth``` method is synchronous.

One last step that should be taken is to call ```Client#getNotificationsService``` to initialize the
notification service. The notification service is lazy loaded and will only be created upon being
requested the first time.

## Further Reading

To learn more about the Java SDK api you can view the latest javadoc at
https://enjin.github.io/Enjin-Coin-Java-SDK/. As the api matures we will expand the documentation
with more example code.