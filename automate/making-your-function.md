# Function Code Anatomy

With your function project made and the code available on GitHub, you can start making it your own. Where you choose to develop (locally or codespace) is up to you, but assuming locally on your machine for now, we can clone the project as per the success instructions and cover some of the code architecture.

::: tip 💡 .github

This directory is for automations used to keep your function code up to date and ease the publishing process.

- `dependabot.yml`.: This specification keeps track of GitHub actions used and will recommend updates when necessary.
- `workflows/main.yml`: When you make a Release of your function code, this action will trigger and publish a revision to Speckle Automate
:::

The template projects for specklepy and speckle-sharp include all required for a working function to deploy in an automation. The anatomy doesn’t have to match exactly, but it does have to have these key components:

### Function Inputs

- **Python**
    
    This is a class object of `FunctionInputs` subclassing `AutomateBase` from the SpecklePy Automate SDK in Python.
    
    Defining properties of this class using [Pydantic](https://docs.pydantic.dev/latest/usage/models/) `Field` objects, these can be extended to cover various UI elements in the function inputs UI. A special base object is the `SecretStr`, allowing authors to define secret fields that Automate will respect and store securely.
    
    ```python
    class FunctionInputs(AutomateBase):
    		text_input: str = Field(
    			title="Text Input",
    			description="Values given in this field will be available with the `text_input` key."
    		)
    		
    		scalar_value: float = Field(
    			default=25.0,
    			title="Numerical value",
    			description=( "Annotating a field and providing a default value will tell the " 
    										"Automate UI to treat the input field as a number" )
    		)
    		
    		selection: str = Field(
    			default=Selection.default,
    			title="Select an option",
    			description=( "Specifying a class and value as the default will provide the "
    										"UI with a drop-down selection, preselecting the default value",
    			json_scheme_extra={
    				"examples": ["default", "option 2", "option 3"]
    			}
    		)
    		
    		read_only: str = Field(
    			default="Placeholder",
    			title="Disabled Input Field",
    			description=( "Marking a field as readOnly will disable the UI input,"
    										"which can be used to mock input UI for future revision "
    										"or pass values specific to a function revision." ) 
    		) 
    ```
    

- C#
    
    ```csharp
    #FunctionInputs.cs
    
    struct FunctionInputs
    {
    	[Required]
    	public string TextInput; // A required string input. UI will infer the Property Title
    
    	[Range(0.0, 100.0)]
    	public float ScalarValue; // A float variable between 0 and 100
    
    	[DisplayName("Specific Input Title")]
    	[Description("This is a description for the example input.")]
    	public string DecoratedInput; // A range of Attributes applied.	
    } 
    ```
    
- **Secrets Management**
    
    It is possible to flag function inputs so that the Automate UI will obfuscate them on entry in the typical web fashion (`********`). This will also cause Automate to store these as encrypted and only pass them as plain text within `AutomateContext` at runtime.
    
    - C#
        
        ```csharp
        struct FunctionInputs
        {
        	[Secret]
        	public string SecretInput; // Mark a field as secret for passwords and 3rd party tokens
        } 
        ```
        
    - Python
        
        ```python
        from Pydantic import SecretStr
        
        class FunctionInputs(AutomateBase):
        
        		secret_input: SecretStr = Field(
        			title="Secret Input",
        			description=( "Marking a field as readOnly will disable the UI input,"
        										"which can be used to mock input UI for future revision "
        										"or pass values specific to a function revision." ) 
        		) 
        ```
        

### Run Entry Points

In the GitHub action, there is a space to define the eventually built function as it would be executed from a command line with either `dotnet SpeckleAutomateDotnetExample.dll` or `python [main.py](http://main.py/) run`, which is the general rule for all Automate functions, whether defined with the template projects or not.

- **Python**
    
    The essential execution of a Python SDK function is:
    
    ```csharp
    if __name__ == "__main__":
        execute_automate_function(automate_function, FunctionInputs)
    ```
    
    `FunctionInputs` is the class described earlier, and `automate_function` is the single entry point to your business logic. You can define as many classes, external modules, and functions within your repository code, but this will be your key function.
    
- **C#**
    
    The template executable method using the dotnet SDK is:
    
    ```csharp
    #Program.cs
    
    return await AutomationRunner
      .Main<FunctionInputs>(args, AutomateFunction.Run)
      .ConfigureAwait(false);
    ```
    
    `FunctionInputs` is as we’ve described above, and `AutomateFunction` will be defined as a class with a `Run` method that, as with the Python example, can contain all of your business logic or be the entry point to which you can structure all of your function classes, properties, and methods as you see fit.
    

::: tip 💡 You may rename and restructure your function code as you wish as long as these execution entry points are followed. However, it may make sense to adopt the template's structure to debug easily and allow others to follow the flow for the beta testing.

The main `.csproj` for dotnet functions should be renamed to reflect your function name; make sure to adjust the `workflow/main.yml` file to reflect this.
:::

### 🧪 Testing

Functions must be registered to Automations to trigger by events. It is recommended that you implement a structure of your project such that a lot of the business logic can be tested independently of the specifics of both the Automate environment and the Speckle data triggering the events.

::: warning TODO 
We will cover testing strategies more later, but the demonstration projects are all available to explore. We have examples of testing on live project data for unit tests and end-to-end integration testing.
:::
