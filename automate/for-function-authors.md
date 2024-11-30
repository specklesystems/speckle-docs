# For Function Authors

- **[Creating Functions](./create-function.html):** Follow our detailed instructions for publishing your first function using the Automate wizard.  

- **[Updating Functions](./release-function-version.html):** Once your function is published, subsequent updates automatically set the function listing to display the latest revision. However, automations already using your function must be manually edited to point to specific modifications if required.

- **APIs and Data Access:** Functions can make external API calls or interact with other Speckle Models using REST, leveraging any library of your choice. Speckle SDKs include a subset of methods tailored for handling automation results data. Refer to the API documentation for additional details.

- **Runtime:** Automate functions execute once per trigger and are allocated generous execution time to support computationally intensive processes. However, long-running executions using RTC, sockets, or similar methods are not supported.

- **Rate Limits:** Functions can trigger other functions, which may result in infinite execution loops. Speckle has implemented rate limiting during beta testing to mitigate this risk. Additional safeguards will be introduced once Speckle Automate transitions to a paid compute model, but excessive loops could still lead to significant compute costs.

- **Best Practices:**
  - **Test Thoroughly:** Ensure your code is thoroughly tested before deployment. Modularise your function so business logic can be tested locally, reducing the need for live testing on every model version.
  - **Utilise CI/CD Pipelines:** Incorporate automated test suites into GitHub workflows for robust quality assurance.
  - **Optimise Performance:** Write efficient code to minimise execution time and resource usage, enhancing the overall reliability of your functions.
