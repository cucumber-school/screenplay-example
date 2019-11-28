namespace :docs do
  task :code do
    current_branch = `git rev-parse --abbrev-ref HEAD`
    `rm -rf docs/code`
    `mkdir docs/code`
    commits = `git rev-list start...end`.split.reverse
    commits.each_with_index do |commit, i|
      message = `git show -s --format=%s #{commit}`.
        downcase.
        gsub(/ /, '-').
        gsub(/[.,\':]/, '')
      dir = "docs/code/%02d-#{message}" % i
      `mkdir #{dir}`
      `git checkout #{commit}`
      `cp -R {lib,features,package.json} #{dir}`
    end
    `git checkout #{current_branch}`
  end

  task :html do
    require 'asciidoctor'
    Asciidoctor.convert_file 'docs/index.adoc',
      safe: :unsafe,
      to_dir: 'docs',
      mkdirs: true
  end
end

task :default => ['docs:code', 'docs:html']
