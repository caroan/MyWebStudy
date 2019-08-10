<?php
    abstract class AbstractPageTemplate{
        protected final function template(){
            $result = $this->header();
            $result .= $this->article();
            $result .= $this->footer();
            return $result;
        }

        protected abstract function header();
        protected abstract function article();
        protected abstract function footer();

        public function render(){
            return $this->template();
        }
    }

    class TextPage extends AbstractPageTemplate{
        protected function header(){
            return "PHP\n";
        }
        protected function article(){
            return "PHP: Hypertext preprocess\n";
        }
        protected function footer(){
            return "website is php.net\n";
        }
    }

    class HtmlPage extends AbstractPageTemplate
    {
        protected function header()
        {
            return "<header>PHP</header>\n";
        }
        protected function article()
        {
            return "<article>PHP: Hypertext Preprocessor</article>\n";
        }
        protected function footer()
        {
            return "<footer>website is php.net</footer>\n";
        }
        public function render()
        {
            $result = '<html>';
            $result .= $this->template();
            return $result.'</html>';
        }
    }

    echo "<h1>text</h1>";
    $text = new TextPage();
    echo $text->render();

    echo "<h1>html</h1>";
    $html = new HtmlPage();
    echo $html->render();
?>