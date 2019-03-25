# Design and implementation overview

1. The app is intended to showcase some data comparisons and insights into two of datasets (US Employment data and US House price indexes). It does so by comparing them side by side and going into deeper details on one of them. 
    The code was structured in a way that allows reusability by taking each component out into its own. Here ReactJS shines through its modular paradigm.
    From the beginning I wanted to have 3 panes through which the user can navigate. Within them, several elements of the page would show various data and statistics. This dictated how modular the code should be.
2.  I have decided to use an online hosting method to deploy the app. I have experimented with gcloud's AppEngine but have not been successful. In the interest of time I have used a more familiar service called Netlify. 
	The app uses ReactJS as framework and Bootstrap and React-Bootstrap as component libraries.  
3. The main roadblocks I have encountered had to do with D3 and my lack of familiarity with it. This was overcome by reading some guides on its usage and concepts behind it. 
4. Trade-offs made include the lack of flexibility in data choice and the relative limited functionality of the insights pane. These are present due to more in-depth development of other features.
5. The solution manages to recah most of the points highlighted in the specification. Some more modularity could be adde throught refactoring. Also, more user flexibility can be offered to the user by making dataset slection possible.

The bonus points reached:
- Use of ES6 syntax.
- Clear, concise and maintainable code.
- Descriptive yet concise commit messages.
- Use of D3.
- Creative use of data in terms of interactivity.
- Followed Google's style guide for JavaScript by means of ESLint config.
