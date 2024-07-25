# For Function Authors

- **[Creating functions](./create-function.html):** Follow our detailed instructions for publishing your first function using the Automate wizard. 
    
- **[Updating functions](./release-function-version.html):** After your code's initial release completes your function's publishing, subsequent releases will automatically set the function listing to show the latest revision. Automations already using your function must be edited to point to specific modifications.
- **APIs and Data Access**: Functions can make external calls or even calls to other Speckle Models using REST via whatever library you choose. Speckle SDKs include a subset of methods specifically to handle Automate data. More details about this are below.
    
- **Runtime**: Automate functions run once per trigger; there is a generous execution time for all functions to cope with even intensive computation. This is not intended to allow for deliberately long-running executions with RTC or sockets, etc.
- **Rate-limits:** Functions CAN cause other functions to run. This could cause infinite execution loops. Speckle has implemented rate limiting as a bulwark against this during beta testing. When Speckle Automate moves to a paid compute, Speckle will have other methods of detecting such loops, but you could still incur an expensive compute cost.
- **Best Practices**: Do test, test and test your code. Deploying code to Automate the testing on every model version sent is possible but will become tedious. Look into modularising your function so that business logic can be tested locally. Test suites can be executed as part of the GitHub automation for quality CI/CD.
