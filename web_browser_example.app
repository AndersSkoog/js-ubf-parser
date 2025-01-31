{application, web_browser_example,
 [
  {description, "A simple game UBF plugin"},
  {vsn, "1.0"},
  {modules, [web_browser_example]},
  {registered, []},    
  {applications, [kernel, stdlib, ubf]},
  {mod, {web_browser_example, []}},
  {env, []}             
 ]}.